import { useQuery } from "@tanstack/react-query";
import { GetMessages } from "../services/getmessage.service";

const useGetMessages = (id: string) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () => GetMessages(id),
    staleTime: 0,
  });
};
export default useGetMessages;
