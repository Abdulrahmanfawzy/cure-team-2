import { api } from "@/features/auth/api/axios";
import type { Conversation } from "../types";

export const getConversation = async (): Promise<Conversation[]> => {
    const response = await api.get("conversations");
    console.log("conversations response:", response.data);
    return response.data?.data?.conversations ?? [];
};