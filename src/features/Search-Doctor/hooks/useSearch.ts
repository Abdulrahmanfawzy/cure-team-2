import { useQuery } from "@tanstack/react-query"
import { SearchService } from "../Services/Search.service"

export const useSearch = (search:string , page:number) => {
    return useQuery({
        queryKey:["search" , search , page],
        queryFn: () => SearchService(search,page),
        staleTime:5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        
    })

}