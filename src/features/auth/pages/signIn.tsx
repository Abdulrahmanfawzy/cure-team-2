
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import { useLogin } from "../hooks/useLogin";
import { PATHS } from "@/app/router";

export default function SignInPage() {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone) {
      return;
    }

    loginMutation.mutate(phone, {
      onSuccess: (data) => {
        console.log("========== LOGIN SUCCESS ==========");
        console.log("Login OTP sent:", data);
        console.log("Phone:", phone);
        console.log("===================================");

        // Save phone in case page is refreshed
        sessionStorage.setItem("login_phone", phone);

        // Go to the SAME verification page
        // but tell it this is LOGIN verification
        navigate(PATHS.codeVerfication, {
          state: {
            flow: "login",
            phone,
          },
        });
      },

      onError: (error: any) => {
        console.log("========== LOGIN ERROR ==========");
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);
        console.log("Message:", error.response?.data?.message);
        console.log("=================================");
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
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {/* Phone */}
        <div className="w-full">
          <PhoneInput
            defaultCountry="eg"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputClassName="!w-full !border-none !bg-transparent !text-sm !shadow-none !outline-none focus:!ring-0"
            className="flex items-center w-full rounded-xl border border-gray-200 px-3 py-2 bg-white shadow-sm focus-within:border-blue-500"
          />
        </div>

        {/* Sign In */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-primary hover:bg-blue-700 disabled:opacity-50 text-white font-medium p-3 rounded-xl transition duration-200 text-sm"
        >
          {loginMutation.isPending ? "Sending..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute bg-white px-3 text-xs text-gray-400">
            or
          </div>

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

        {/* Sign Up */}
        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{" "}
          <a
            href={PATHS.signUp}
            className="text-blue-600 font-medium"
          >
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

