import { useQuery } from "@tanstack/react-query"
import SpecialistService from "../Services/Specialist.service"

const useSpecialist = () => {
    return useQuery({
        queryKey:["specialist"],
        queryFn:SpecialistService
    })
}   

export default useSpecialist