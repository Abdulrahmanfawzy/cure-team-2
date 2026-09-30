import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPaymentMethod } from "../services/appointment.service";
import { toast } from "sonner";
import axios from "axios";


export const useAddPaymentMethod = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addPaymentMethod,
        onSuccess: (response) => {
            queryClient.setQueryData(['payment-methods'], (oldData: any) => {
                const existingMethods = Array.isArray(oldData?.data) ? oldData.data : [];

                return {
                    ...oldData,
                    success: true,
                    message: response.message,
                    data: response.data ? [response.data, ...existingMethods] : existingMethods,
                };
            });

            queryClient.invalidateQueries({
                queryKey: ['payment-methods'],
            });
            toast.success(response.message);
        },
        onError: (error) => {
            console.log("ADD PAYMENT ERROR:", error);

            if (axios.isAxiosError(error)) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA:", error.response?.data);

                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
            } else {
                toast.error("Something went wrong");
            }
        },

    });
};