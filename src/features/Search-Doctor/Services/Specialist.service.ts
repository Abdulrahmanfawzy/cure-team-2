import { api } from "@/utils/axios";

const SpecialistService =async () => {
     const response = await api.get("/home/specialties");
     return response.data.data
}
export default SpecialistService