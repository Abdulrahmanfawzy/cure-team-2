import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import { PATHS } from "../../../app/router/paths";
import {
  resetPasswordSchema,
  type ResetPasswordType,
} from "../schemas/auth-schemas";
import { resetPasswordApi } from "../api/auth-api";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetToken = location.state?.resetToken || sessionStorage.getItem("reset_token");
  const phone = location.state?.phone || sessionStorage.getItem("reset_phone");

  useEffect(() => {
    if (location.state?.resetToken) sessionStorage.setItem("reset_token", location.state.resetToken);
    if (location.state?.phone) sessionStorage.setItem("reset_phone", location.state.phone);
  }, [location.state]);

  useEffect(() => {
    if (!resetToken || !phone) {
      navigate(PATHS.signIn, { replace: true });
    }
  }, [resetToken, phone, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const {
    mutate: resetPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (response) => {
      console.log("Password reset successfully:", response);
      sessionStorage.removeItem("reset_token");
      sessionStorage.removeItem("reset_phone");
      navigate(PATHS.signIn, { replace: true });
    },
    onError: (error: any) => {
      console.error("Reset Password Error:", error.response?.data);
    },
  });

  const onSubmit = (data: ResetPasswordType) => {
    if (!resetToken || !phone) {
      alert("Reset token or phone number is missing");
      return;
    }

    resetPassword({
      reset_token: resetToken,
      phone: phone, 
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  if (!resetToken || !phone) {
    return null;
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Password"
        subtitle="Enter your new password"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        {/* New Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">New Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter new password"
              className="w-full p-3 border rounded-xl text-sm pr-10 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">Confirm Password</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("password_confirmation")}
              placeholder="Confirm new password"
              className="w-full p-3 border rounded-xl text-sm pr-10 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* API Error */}
        {error && (
          <p className="text-sm text-red-500">
            {(error as any)?.response?.data?.message || "Something went wrong. Please try again."}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}