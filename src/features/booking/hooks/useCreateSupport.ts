import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelBook, createSupport } from "../services/booking.service";


export const useCreateSupport = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({bookingId,subject,message}:{bookingId:string,subject:string,message:string

        })=> createSupport(bookingId,{subject,message}),
        onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['bookings']
        });
    },
    });
    
}