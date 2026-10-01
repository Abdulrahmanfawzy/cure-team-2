import { useQuery } from "@tanstack/react-query";
import { SearchService } from "../Services/Search.service";

export const useSearch = (search: URLSearchParams, page: number) => {
  return useQuery({
    queryKey: ["search", search.toString(), page],
    queryFn: () => SearchService(search, page),
  });
};
