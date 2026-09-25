// types/appointment.types.ts

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "cancelled";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  location: string;
  status: AppointmentStatus;
}

export type AppointmentTab = "all" | AppointmentStatus;