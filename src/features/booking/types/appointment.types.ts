// types/appointment.types.ts

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "rescheduled"
  | "rejected"
  | "expired";

export type AppointmentFilter =
  | "Upcoming"
  | "Completed"
  | "Canceled";



export type AppointmentTab =  | "all"
  | "upcoming"
  | "completed"
  | "canceled";