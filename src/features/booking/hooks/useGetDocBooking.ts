import {  useQuery } from "@tanstack/react-query";
import { getDoctorsBooking } from "../services/booking.service";


const useGetDocBooking =()=>{
    const query =useQuery ({
      queryKey:['booking'],
      queryFn: getDoctorsBooking
    })
    return query;
}
export default useGetDocBooking;