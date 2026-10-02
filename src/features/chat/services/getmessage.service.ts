import { api } from "@/features/auth/api/axios";

export const GetMessages = async (id: string) => {
  const response = await api.get(`/conversations/${id}/messages`);
  return response.data;
};
