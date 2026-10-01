import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../services/appointment.service";




const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};

export default useCreatePayment;