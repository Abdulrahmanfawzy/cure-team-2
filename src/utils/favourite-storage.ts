import { STORAGE_KEYS } from "@/constants/storage-keys";

/**
 * Local cache of favourite doctors.
 *
 * The doctor-details API does not reliably return favourite status, so the
 * client persists favourites in localStorage as a map of
 * `doctorId -> favouriteRecordId` (the record id is required by
 * `DELETE favourites/{id}`). The server list (`GET favourites`) reconciles
 * this map whenever it loads.
 *
 * The store is reactive: `subscribe` + `getIds` are wired into
 * `useSyncExternalStore`, so every write notifies React subscribers.
 */
export type FavouriteMap = Record<string, string>;

type Listener = () => void;

const listeners = new Set<Listener>();

// Snapshot cache — getSnapshot must return a stable reference between writes.
let cachedRaw: string | null = null;
let cachedIds: string[] = [];

const parse = (raw: string | null): FavouriteMap => {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as FavouriteMap)
      : {};
  } catch {
    return {};
  }
};

const read = (): FavouriteMap => {
  try {
    return parse(localStorage.getItem(STORAGE_KEYS.favouriteDoctors));
  } catch {
    return {};
  }
};

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

const write = (map: FavouriteMap): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.favouriteDoctors, JSON.stringify(map));
  } catch {
    // Ignore quota/serialization failures — favourites just won't persist.
    return;
  }
  notify();
};

/** Reactive snapshot getter for `useSyncExternalStore`. */
const getIds = (): string[] => {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEYS.favouriteDoctors);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = Object.keys(parse(raw));
  }
  return cachedIds;
};

export const favouriteStorage = {
  /** `useSyncExternalStore` subscribe function. */
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /** `useSyncExternalStore` snapshot — list of favourite doctor ids. */
  getIds,

  getAll: read,

  getFavouriteId: (doctorId: string): string | undefined => read()[doctorId],

  has: (doctorId: string): boolean => doctorId in read(),

  set: (doctorId: string, favouriteId: string): void => {
    const map = read();
    map[doctorId] = favouriteId;
    write(map);
  },

  remove: (doctorId: string): void => {
    const map = read();
    delete map[doctorId];
    write(map);
  },

  replaceAll: (map: FavouriteMap): void => write(map),

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.favouriteDoctors);
    } catch {
      // Ignore — nothing to clean.
    }
    notify();
  },
};
