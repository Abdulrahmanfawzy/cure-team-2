import { useQuery } from "@tanstack/react-query"
import { fetchDoctorDetails } from "../services/appointment.service";

// doc info and days available for appointment page
const useGetDoctorDetails =(id:string)=>{
    const query=useQuery({
        queryKey:["doctor", id],
        queryFn:()=> fetchDoctorDetails(id),
        enabled:!!id

    });
    return query;
}
export default useGetDoctorDetails;