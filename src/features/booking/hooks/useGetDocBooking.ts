import {  useQuery } from "@tanstack/react-query";
import { getDoctorsBooking } from "../services/booking.service";
import type { AppointmentStatus } from "../types/appointment.types";

interface BookingQuery {
    statuses?: AppointmentStatus[];
    date?: string;
}

const useGetDocBooking = ({ statuses, date }: BookingQuery = {}) => {
    const normalizedStatuses = statuses?.length ? [...statuses].sort() : undefined;

    return useQuery({
      queryKey: ["booking", normalizedStatuses?.join(",") ?? "all", date ?? "all"],
      queryFn: async () => {
        const requestedStatuses: (AppointmentStatus | undefined)[] = normalizedStatuses ?? [undefined];
        const responses = await Promise.all(
          requestedStatuses.map((status) => getDoctorsBooking({ status, date }))
        );
        const uniqueBookings = new Map(
          responses.flatMap((response) => response.data).map((booking) => [booking.id, booking])
        );

        return {
          ...responses[0],
          data: [...uniqueBookings.values()],
        };
      },
    });
}
export default useGetDocBooking;