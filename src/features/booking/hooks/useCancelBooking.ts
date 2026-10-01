import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelBook } from "../services/booking.service";


export const useCancelBooking = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({bookingId,cancel_reason}:{bookingId:string,cancel_reason:string

        })=> cancelBook(bookingId,{cancel_reason}),
        onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['bookings']
        });
    },
    });
    
}