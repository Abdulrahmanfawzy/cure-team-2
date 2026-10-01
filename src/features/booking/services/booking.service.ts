import { api } from "@/utils/axios"
import { format, parseISO } from "date-fns";
import type { BookingsResponse } from "../types/booking.types";
import type { AppointmentStatus } from "../types/appointment.types";

interface BookingFilters {
    status?: AppointmentStatus;
    date?: string;
}

export const getDoctorsBooking = async (filters: BookingFilters = {}): Promise<BookingsResponse> => {
    const params: BookingFilters = {};
    if (filters.status) params.status = filters.status;
    if (filters.date) params.date = format(parseISO(filters.date), "yyyy-MM-dd");

    const result = await api.get<BookingsResponse>('booking', { params });
    return result.data;
}