
import { addToFavourite } from "../services/appointment.service";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToFavourite = (doctor_id: string) => {
    const queryClient = useQueryClient();
   return useMutation({
        mutationFn: () => addToFavourite(doctor_id),
        onSuccess: () => {  
            queryClient.invalidateQueries();
            toast.success("Doctor added to favourites successfully");
        },
        onError: (error:any) => {
            console.error("Error adding to favourites:", error);
            toast.error("Failed to add doctor to favourites");
        },
    }); 
}