import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";

import {
  verifyRegisterOtpApi,
  verifyLoginOtpApi,
  verifyResetOtpApi,
  resendOtpApi,
} from "../api/auth-api";

import { PATHS } from "../../../app/router/paths";

export default function VerificationCodePage() {
  const [verificationCode, setVerificationCode] =
    useState(["", "", "", ""]);

  const location = useLocation();
  const navigate = useNavigate();

  const flow = location.state?.flow;
  
  const isLogin = flow === "login";
  const isForgotPassword = flow === "forgot-password";

  const phone =
    location.state?.phone ||
    sessionStorage.getItem(
      isLogin ? "login_phone" : "register_phone"
    ) ||
    "";

  useEffect(() => {
    if (!flow) {
      navigate(PATHS.signIn, { replace: true });
    }
  }, [flow, navigate]);

  if (!flow) {
    return null;
  }

  const getMutationFn = () => {
    if (isLogin) return verifyLoginOtpApi;
    if (isForgotPassword) return verifyResetOtpApi;
    return verifyRegisterOtpApi;
  };

  const {
    mutate: verifyOtp,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: getMutationFn(),

    onSuccess: (data) => {
      console.log("========== VERIFY SUCCESS ==========");
      console.log("RESPONSE:", data);

      if (isLogin) {
        navigate(PATHS.home, { replace: true });
        return;
      }

      if (isForgotPassword) {
        const resetToken = data?.data?.reset_token || data?.reset_token;
        
        // حفظ الـ Token و الـ Phone في SessionStorage عشان الـ Refresh
        sessionStorage.setItem("reset_token", resetToken);
        sessionStorage.setItem("reset_phone", phone);
        
        // التوجيه الصحيح لصفحة الـ Reset Password
        navigate(PATHS.ResetPassword, {
          replace: true,
          state: { phone, resetToken },
        });
        return; 
      }

      navigate(PATHS.signIn, { replace: true });
    },

    onError: (err: any) => {
      console.log("========== VERIFY ERROR ==========");
      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
      console.log("==================================");
    },
  });

  const handleCodeChange = (
    index: number,
    value: string
  ) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = digit;
    setVerificationCode(newCode);

    if (digit && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Backspace") return;

    e.preventDefault();
    const newCode = [...verificationCode];

    if (!newCode[index] && index > 0) {
      newCode[index - 1] = "";
      setVerificationCode(newCode);
      const previousInput = document.getElementById(`otp-input-${index - 1}`);
      previousInput?.focus();
    } else {
      newCode[index] = "";
      setVerificationCode(newCode);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const codeString = verificationCode.join("");

    if (codeString.length !== 4) {
      alert("Please enter the full 4-digit code");
      return;
    }

    if (!phone) {
      alert("Phone number is missing");
      return;
    }

    const verifyData = isForgotPassword
      ? { phone, type: "reset-password", code: codeString }
      : isLogin
      ? { phone, type: "login", code: codeString }
      : { phone, code: codeString };

    verifyOtp(verifyData as any);
  };

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: resendOtpApi,
    onSuccess: () => {
      alert("OTP resent successfully!");
      setVerificationCode(["", "", "", ""]);
      document.getElementById("otp-input-0")?.focus();
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Failed to resend OTP.");
    },
  });

  const handleResendClick = () => {
    if (!phone) {
      alert("Phone number is missing");
      return;
    }

    const type = isLogin ? "login" : isForgotPassword ? "reset-password" : "register";
    resendOtp({ phone, type });
  };

  const backendMessage = (error as any)?.response?.data?.message;

  return (
    <AuthLayout>
      <AuthHeader
        title="Code Verification"
        subtitle={`Code has been sent to ${
          phone || "your phone"
        }. Check your phone, you can resend code in 60 seconds.`}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex justify-end items-end mb-2">
          <button
            type="button"
            onClick={handleResendClick}
            disabled={isResending}
            className="text-sm text-primary font-medium hover:underline bg-transparent border-none cursor-pointer disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend code"}
          </button>
        </div>

        <div className="w-full flex justify-center">
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={verificationCode[index]}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm bg-white"
              />
            ))}
          </div>
        </div>

        {isError && (
          <p className="text-xs text-red-500 text-center">
            {backendMessage || "Invalid or expired OTP code"}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-blue-700 text-white font-medium p-3 rounded-xl transition duration-200 text-sm shadow-sm disabled:opacity-50"
        >
          {isPending ? "Verifying..." : "Verify"}
        </button>
      </form>
    </AuthLayout>
  );
}