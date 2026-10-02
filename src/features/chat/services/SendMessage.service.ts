import { api } from "@/features/auth/api/axios";

export const SendMessageService = async (id: string) => {
    const res = await api.delete(`/messages/${id}`);
    return res.data;
};