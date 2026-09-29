
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
  gender: string;
  specialist: Specialist;
  about: string;
  experience: number;
  consultation_price: number;
  rating_avg: number;
  reviews_count: number;
  patients_count: number;
  opening_hours: string;
  location: Location;
  distance: number | null;
  is_favorite: boolean;
  available_slots: AvailableSlot[];
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

export interface AvailableSlot {
  id: string;
  date: string;
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

