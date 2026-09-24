
import { api } from "./axios";

export const signUpApi = async (userData: any) => {
  try {
    const response = await api.post("auth/register", userData);

    return response.data;
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    console.error("REGISTER STATUS:", error.response?.status);
    console.error("REGISTER DATA:", error.response?.data);

    throw error;
  }
};

export const verifyRegisterOtpApi = async (verifyData: {
  phone: string;
  code: string;
}) => {
  try {
    console.log("VERIFY REQUEST DATA:", verifyData);

    const response = await api.post(
      "auth/register/verify",
      verifyData
    );

    console.log("VERIFY SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("========== VERIFY OTP ERROR ==========");
    console.error("Full Error:", error);
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);
    console.error("Response Headers:", error.response?.headers);
    console.error("======================================");

    // مهم: نرمي الـ AxiosError نفسه
    throw error;
  }
};

export const resendOtpApi = async (data: {
  phone: string;
  type: string;
}) => {
  try {
    console.log("RESEND REQUEST DATA:", data);

    const response = await api.post("auth/resend", data);

    console.log("RESEND SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("========== RESEND OTP ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);
    console.error("======================================");

    throw error;
  }
};

export const login = async (phone: string) => {
  try {
    const response = await api.post("auth/login", {
      phone,
    });

    console.log("LOGIN SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("========== LOGIN ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Response Data:", error.response?.data);
    console.log("================================");

    throw error;
  }
};

export const verifyLoginOtpApi = async (verifyData: {
  phone: string;
  code: string;
}) => {
  try {
    console.log("LOGIN VERIFY REQUEST:", verifyData);

    const response = await api.post(
      "auth/login/verify",
      verifyData
    );

    console.log("LOGIN VERIFY SUCCESS:", response.data);

    return response.data;
  } catch (error: any) {
    console.error("========== LOGIN VERIFY ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);
    console.error("========================================");

    throw error;
  }
};
export const forgotPasswordApi = async (data: { phone: string }) => {
  const response = await api.post('auth/forgot-password', data);
  return response.data;
};

export const verifyResetOtpApi = async (data: { phone: string; type: string; code: string }) => {
  const response = await api.post('auth/verify-reset-otp', data);
  return response.data;
};

export const resetPasswordApi = async (data: { phone: string; reset_token: string; password: string; password_confirmation: string }) => {
  const response = await api.post('auth/reset-password', data);
  return response.data;
};
