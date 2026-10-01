import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../services/appointment.service";
import type { CreateBookingPayload } from "../types/bookAppointment.types";



const useCreateBookAppointment = () => {
  return useMutation({
     mutationFn: (data: CreateBookingPayload) => bookAppointment(data),
  });
};

export default useCreateBookAppointment;