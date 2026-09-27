import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import { useLogin } from "../hooks/useLogin";
import { PATHS } from "@/app/router";
import { signInSchema, type SignInType } from "../schemas/auth-schemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react"; // تأكد من توفر المكتبة أو استبدالها بـ SVG

export default function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: SignInType) => {
    loginMutation.mutate(data.phone, { 
      onSuccess: (response) => {
        console.log("========== LOGIN SUCCESS =========Params:", response);

        sessionStorage.setItem("login_phone", data.phone);
        sessionStorage.setItem("auth_flow", "login");

        navigate(PATHS.codeVerfication, {
          replace: true,
          state: {
            flow: "login",
            phone: data.phone,
          },
        });
      },

      onError: (error: any) => {
        console.log("========== LOGIN ERROR ==========");
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
        console.log("Message:", error.response?.data?.message);
        console.log("======================================");
      },
    });
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Sign in"
        subtitle="Please enter your phone number and password"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        {/* Phone Input */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                defaultCountry="eg"
                value={field.value}
                onChange={field.onChange}
                inputClassName="!w-full !border-none !bg-transparent !text-sm !shadow-none !outline-none focus:!ring-0"
                className="flex items-center w-full rounded-xl border border-gray-200 px-3 py-2 bg-white focus-within:border-blue-500"
              />
            )}
          />
          {errors.phone && (
            <span className="text-xs text-red-500">{errors.phone.message}</span>
          )}
        </div>

        {/* Password Input with Eye Icon */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-700">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500">{errors.password.message}</span>
          )}
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-primary hover:bg-blue-700 disabled:opacity-50 text-white font-medium p-3 rounded-xl transition duration-200 text-sm mt-2"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute bg-white px-3 text-xs text-gray-400">or</div>
          <div className="w-full border-t border-gray-100" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium p-3 rounded-xl flex justify-center items-center gap-2 transition duration-200 text-sm"
        >
          <img
            src="/src/assets/flat-color-icons_google.svg"
            className="w-5 h-5"
            alt="google"
          />
          Sign in with Google
        </button>

        {/* Forgot Password */}
        <p className="text-center text-sm text-gray-500 mt-1">
          Forgot your password?{" "}
          <a
            href={PATHS.forgotPassword}
            className="text-blue-600 font-medium hover:underline"
          >
            Forgot password
          </a>
        </p>

        {/* Sign Up */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href={PATHS.signUp}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}