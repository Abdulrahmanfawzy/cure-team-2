export interface DoctorResponse {
  data: Doctor;
}

export interface Doctor {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  gender: "male" | "female";
  specialist: Specialist;
  about: string;
  experience: number;
  education: string;
  certificates: string;
  languages: string[];
  consultation_price: number;
  rating_avg: number;
  ratings_count: number;
  reviews_count: number;
  patients_count: number;
  opening_hours: string;
  location: Location;
  distance: number | null;
  is_favorite: boolean;
  available_slots: AvailableSlotDate[];
  reviews: Review[];
}

export interface Specialist {
  id: string;
  name: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface AvailableSlotDate {
  date: string;
  slots: Slot[];
}

export interface Slot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  created_at_human: string;
  patient: Patient;
}

export interface Patient {
  id: string;
  name: string;
  profile_image: string;
}