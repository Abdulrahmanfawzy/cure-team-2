import { api } from "@/features/auth/api/axios";
import type { Profile } from "../types/profile.types";

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get("profile");
  return response.data.data;
};

export const updateProfile = async (data: Partial<Profile>): Promise<Profile> => {
  const response = await api.post("profile", data);
  return response.data.data;
};

export const updateProfileImage = async (file: File): Promise<Profile> => {
  const formData = new FormData();
  formData.append("profile_image", file);
  const response = await api.post("profile", formData);
  return response.data.data;
};

export const changePassword = async (data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.post("change-password", data);
  return response.data;
};
