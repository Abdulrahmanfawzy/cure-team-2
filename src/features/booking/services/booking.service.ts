import { api } from "@/utils/axios"
import type { BookingsResponse } from "../types/booking.types";


export const getDoctorsBooking =async ():Promise<BookingsResponse>=>{
    const result = await api.get<BookingsResponse>('booking');
    return result.data;
}