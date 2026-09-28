import { api } from "@/utils/axios";
import type { DoctorResponse } from "../types/docAppointment.types";
import axios from "axios";


export const fetchDoctorDetails = async (id: string): Promise<DoctorResponse> => {

    try {
        const result = await api.get<DoctorResponse>(`doctor/${id}`);
        console.log("Doctor response:", result.data);

        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("STATUS:", error.response?.status);
            console.log("RESPONSE:", error.response?.data);
            console.log("REQUEST URL:", error.config?.url);
        }

        throw error;
    }
}