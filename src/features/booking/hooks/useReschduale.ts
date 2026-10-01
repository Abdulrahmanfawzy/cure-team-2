import { useMutation, useQueryClient } from "@tanstack/react-query"
import { rescheduleAppointment } from "../services/booking.service";



export const useReschedule = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({bookingId,slotId}:{bookingId:string,slotId:string

        })=> rescheduleAppointment(bookingId,{slotId}),
        onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['reschedule']
        });
    },
    });
    
}