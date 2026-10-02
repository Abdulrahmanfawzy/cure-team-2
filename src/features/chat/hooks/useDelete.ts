import { useMutation } from "@tanstack/react-query";
import { SendMessageService } from "../services/SendMessage.service";

const useDeletMessage = () => {
  return useMutation({
    mutationFn: (id: string) => SendMessageService(id),
  });
};

export default useDeletMessage;
