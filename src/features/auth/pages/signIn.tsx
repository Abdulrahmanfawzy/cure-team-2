import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import { useLogin } from "../hooks/useLogin";
import { PATHS } from "@/app/router";
import { signInSchema, type SignInType } from "../schemas/auth-schemas";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInPage() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: SignInType) => {
    setApiError(null);
    loginMutation.mutate(data.phone, { 
      onSuccess: (response) => {
        console.log("========== LOGIN SUCCESS =========Params:", response);
        
        sessionStorage.setItem("login_phone", data.phone);
        sessionStorage.setItem("auth_flow", "login");

        const params = new URLSearchParams({ phone: data.phone });
        navigate(`${PATHS.codeVerfication}?${params.toString()}`, {
          replace: true,
          state: {
            flow: "login",
          },
        });
      },

      onError: (error: any) => {
        console.log("========== LOGIN ERROR ==========");
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
        console.log("Message:", error.response?.data?.message);
        console.log("======================================");

        const data = error.response?.data;
        setApiError(
          data?.errors?.phone?.[0] ||
            data?.message ||
            "Something went wrong. Please try again."
        );
      },
    });
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Sign in"
        subtitle="Please enter your phone number"
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
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={field.value}
                onChange={field.onChange}
                className="border border-gray-200 rounded-xl px-3 py-2 w-full text-sm outline-none focus:border-blue-500"
              />
            )}
          />
          {errors.phone && (
            <span className="text-xs text-red-500">{errors.phone.message}</span>
          )}
          {apiError && !errors.phone && (
            <span className="text-xs text-red-500">{apiError}</span>
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
        {/* <div className="relative flex items-center justify-center my-2">
          <div className="absolute bg-white px-3 text-xs text-gray-400">or</div>
          <div className="w-full border-t border-gray-100" />
        </div> */}

        {/* Google */}
        {/* <button
          type="button"
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium p-3 rounded-xl flex justify-center items-center gap-2 transition duration-200 text-sm"
        >
          <img
            src="/src/assets/flat-color-icons_google.svg"
            className="w-5 h-5"
            alt="google"
          />
          Sign in with Google
        </button> */}

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