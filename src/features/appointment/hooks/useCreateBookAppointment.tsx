import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../services/appointment.service";
import type { CreateBookingPayload } from "../types/bookAppointment.types";
import { toast } from "sonner";



const useCreateBookAppointment = () => {
  return useMutation({
     mutationFn: (data: CreateBookingPayload) => bookAppointment(data),
     onSuccess: () => {
       toast.success("Appointment booked successfully");
     },
     onError: (error: any) => {
     
       console.error("Error booking appointment:", error);
       toast.error("Failed to book appointment");
     },
  });
};

export default useCreateBookAppointment;