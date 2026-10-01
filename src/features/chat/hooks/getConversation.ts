import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../services/chat.service";

const useGetConversation = () => {
  return useQuery({
    queryKey: ["conversation"],
    queryFn: getConversation,
    staleTime: 0,
  });
};
export default useGetConversation;
