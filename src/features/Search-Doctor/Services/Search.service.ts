import { api } from "@/utils/axios";

export const SearchService = async (search: string, page:number) => {
  const res = await api.get(`search?search=${search}&page=${page}`);
  return res.data;
};
