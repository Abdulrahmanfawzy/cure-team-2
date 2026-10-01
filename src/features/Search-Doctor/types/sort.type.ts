export type sortType = {
  value: string;
  label: string;
};
export type ChooseSpecialistType = {
  img: string;
  name: string;
};

export type DoctorsType = {
  id: number;
  name: string;
  specialist_id: string;
  about: string;
  experience: string;
  consultation_price: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  rating_avg: string;
  consultation_type: string;
  profile_image: string;
  rating_count: number;
  hospital: string;
  distance: null;
  availabilities: {
    data: {
      id: string;
      date: string;
      start_time: string;
      end_time: string;
      is_booked: boolean;
    }[];
    links: {
      first: string;
      last: string;
      prev: null;
      next: string;
    };
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
  specialist: {
    id: string;
    name: string;
    icone: string;
  };
};
