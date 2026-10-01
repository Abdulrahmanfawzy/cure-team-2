import { useQuery } from "@tanstack/react-query";
import { fetchPaymentMethods } from "../services/appointment.service";


const useGetPaymentMethods = ()=>{
    const query=useQuery({
        queryKey:['payment-methods'],
        queryFn: fetchPaymentMethods

    });
    return query;

}
export default useGetPaymentMethods;