import { useMutation, useQueryClient } from "@tanstack/react-query"
import { bookAgain } from "../services/booking.service";


export const useBookAgain = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({bookingId,slotId}:{bookingId:string,slotId:string

        })=> bookAgain(bookingId,{slotId}),
        onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['bookings']
        });
    },
    });
    
}