/** Doctor summary embedded in favourite responses (`GET/POST favourites`). */
export interface FavouriteDoctor {
  id: string;
  name: string;
  specialist: string;
  image: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  rating_avg: number | null;
  ratings_count: number | null;
}

/** One favourite row: favourite record id + nested doctor. */
export interface FavouriteItem {
  id: string;
  doctor: FavouriteDoctor;
}

export interface FavouritesResponse {
  message: string;
  data: FavouriteItem[];
}

/** `POST favourites` response — returns the created favourite record. */
export interface CreateFavouriteResponse {
  message: string;
  data: FavouriteItem;
}

export interface FavouriteMessageResponse {
  message: string;
}
