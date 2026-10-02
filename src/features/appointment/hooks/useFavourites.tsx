import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  addFavourite,
  fetchFavourites,
  removeFavourite,
} from "../services/appointment.service";
import { favouriteStorage } from "@/utils/favourite-storage";

type ToggleArgs = {
  doctorId: string;
  /** Favourite record id when removing; undefined when adding. */
  favouriteId?: string;
};

type MutationResult =
  | { doctorId: string; action: "add"; favouriteId: string }
  | { doctorId: string; action: "remove" };

const FAVOURITES_QUERY_KEY = ["favourites"] as const;

/**
 * Optimistic placeholder stored as the favourite id until `POST favourites`
 * returns the real record id. Truthy on purpose so a stray toggle attempts
 * (and fails) DELETE instead of a duplicate POST.
 */
const FAVOURITE_PENDING_ID = "__favourite_pending__";

/**
 * Favourite-doctor state.
 *
 * The doctor-details endpoint doesn't return reliable favourite status, so:
 * - localStorage (favouriteStorage) is the synchronous source of truth for
 *   the UI (doctor ids + favourite record ids for `DELETE favourites/{id}`).
 * - `GET favourites` reconciles the cache whenever it loads (server truth).
 * - Toggles are optimistic and roll back with a toast on failure.
 */
export const useFavourites = () => {
  const queryClient = useQueryClient();

  // Reactive view of localStorage (favourite doctor ids).
  const favouriteIds = useSyncExternalStore(
    favouriteStorage.subscribe,
    favouriteStorage.getIds,
  );
  const favouriteIdSet = useMemo(() => new Set(favouriteIds), [favouriteIds]);

  const { data: favourites } = useQuery({
    queryKey: FAVOURITES_QUERY_KEY,
    queryFn: fetchFavourites,
    staleTime: 60_000,
  });

  // Reconcile the local cache with the server list whenever it (re)loads.
  useEffect(() => {
    if (!favourites?.data) return;
    const map: Record<string, string> = {};
    for (const item of favourites.data) {
      map[item.doctor.id] = item.id;
    }
    favouriteStorage.replaceAll(map);
  }, [favourites]);

  const mutation = useMutation({
    mutationFn: async ({
      doctorId,
      favouriteId,
    }: ToggleArgs): Promise<MutationResult> => {
      if (favouriteId) {
        await removeFavourite(favouriteId);
        return { doctorId, action: "remove" };
      }
      const response = await addFavourite(doctorId);
      return { doctorId, action: "add", favouriteId: response.data.id };
    },
    onSuccess: (result) => {
      // Add: swap the optimistic placeholder for the real record id.
      // Remove: storage was already updated optimistically.
      if (result.action === "add") {
        favouriteStorage.set(result.doctorId, result.favouriteId);
        toast.success("Added to favorites");
      } else {
        toast.success("Removed from favorites");
      }
    },
    onError: (error, { doctorId, favouriteId }) => {
      // Roll back the optimistic toggle.
      if (favouriteId) {
        favouriteStorage.set(doctorId, favouriteId);
      } else {
        favouriteStorage.remove(doctorId);
      }

      const message = axios.isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message
        : undefined;
      toast.error(message || "Couldn't update favourites. Please try again.");
    },
    onSettled: () => {
      // Re-sync with the server (also heals duplicate POST 500s).
      queryClient.invalidateQueries({ queryKey: FAVOURITES_QUERY_KEY });
    },
  });

  const isFavorite = useCallback(
    (doctorId: string) => favouriteIdSet.has(doctorId),
    [favouriteIdSet],
  );

  const toggleFavourite = useCallback(
    (doctorId: string) => {
      // Ignore rapid double-clicks while a toggle is in flight.
      if (mutation.isPending) return;

      const favouriteId = favouriteStorage.getFavouriteId(doctorId);

      // Optimistic update.
      if (favouriteId) {
        favouriteStorage.remove(doctorId);
      } else {
        favouriteStorage.set(doctorId, FAVOURITE_PENDING_ID);
      }

      mutation.mutate({ doctorId, favouriteId });
    },
    [mutation],
  );

  return {
    isFavorite,
    toggleFavourite,
    isPending: mutation.isPending,
  };
};

export default useFavourites;
