import type { AppointmentFilter, AppointmentStatus } from "@/features/booking/types/appointment.types";


export const mapAppointmentStatus = (
  status: AppointmentStatus
): AppointmentFilter => {
  switch (status) {
    case "pending":
    case "confirmed":
    case "rescheduled":
      return "Upcoming";

    case "completed":
      return "Completed";

    case "cancelled":
    case "rejected":
    case "expired":
      return "Canceled";
  }
};