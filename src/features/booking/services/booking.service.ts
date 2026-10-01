import { api } from "@/utils/axios"
import { format, parseISO } from "date-fns";
import type { BookagainPayload, BookingsResponse, CancelAppointmentPayload, SupportAppointmentPayload } from "../types/booking.types";
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
export const cancelBook = async (id:string, data: CancelAppointmentPayload) :Promise<CancelAppointmentPayload>=>{
    const result =await api.post(`booking/${id}/cancel`,data);
    return  result.data;
}

export const createSupport = async (id:string, data: SupportAppointmentPayload) :Promise<SupportAppointmentPayload>=>{
    const result =await api.post(`booking/${id}/support`,data);
    return  result.data;
}
export const bookAgain = async (id: string,data: BookagainPayload):Promise<BookagainPayload> => {
  const response = await api.post(`booking/${id}/again`, data);

  return response.data;
};