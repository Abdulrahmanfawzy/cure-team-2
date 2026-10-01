import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  sendFeedback } from "../services/booking.service";


export const useSendFeedback = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({bookingId,comment,rating}:{bookingId:string,comment:string,rating:string

        })=> sendFeedback(bookingId,{comment,rating}),
        onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['feedback']
        });
    },
    });
    
}