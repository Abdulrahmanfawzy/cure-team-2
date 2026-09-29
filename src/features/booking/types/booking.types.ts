interface Doctor {
  doctor_id: string;
  doctor_name: string;
  doctor_image: string;
  specialist: string;
  latitude: number;
  longitude: number;
}

interface Booking {
  id: string;
  patient_id: string;
  time: string;
  date: string;
  doctor: Doctor;
  status: string;
}

export interface BookingsResponse {
  message: string;
  data: Booking[];
}