import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";

import {
  useForm,
  FormProvider,
  Controller,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth-schemas";
import { signUpApi } from "../api/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../app/router/paths";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    mutate: registerUser,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (response, variables) => {
      sessionStorage.setItem("register_phone", variables.phone);
      navigate(PATHS.codeVerfication, {
        state: {
          flow: "register",
          phone: variables.phone,
        },
      });
    },
    onError: (err: any) => {
      console.log("========== REGISTER ERROR ==========", err.response?.data);
    },
  });

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    registerUser(data);
  };

  return (
    <FormProvider {...methods}>
      <AuthLayout>
        <AuthHeader
          title="Sign up"
          subtitle="Please provide all information required to create your account"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {/* Full Name */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-sm text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="border border-gray-200 rounded-xl px-3 py-2 w-full text-sm outline-none focus:border-blue-500"
            />
            {errors.name && (
              <span className="text-xs text-red-500">{String(errors.name.message)}</span>
            )}

            {/* Email */}
            <label htmlFor="email" className="font-medium text-sm text-gray-700 mt-2">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border border-gray-200 rounded-xl px-3 py-2 w-full text-sm outline-none focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{String(errors.email.message)}</span>
            )}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-sm text-gray-700">Password</label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="border border-gray-200 rounded-xl px-3 py-2 w-full text-sm outline-none focus:border-blue-500 pr-10"
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
              <span className="text-xs text-red-500">{String(errors.password.message)}</span>
            )}
          </div>

          {/* Password Confirmation */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password_confirmation" className="font-medium text-sm text-gray-700">Password Confirmation</label>
            <div className="relative flex items-center">
              <input
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Password Confirmation"
                {...register("password_confirmation")}
                className="border border-gray-200 rounded-xl px-3 py-2 w-full text-sm outline-none focus:border-blue-500 pr-10"
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
              <span className="text-xs text-red-500">{String(errors.password_confirmation.message)}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium text-sm text-gray-700">Phone Number</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="eg"
                  value={field.value}
                  onChange={field.onChange}
                  inputClassName="!w-full !border-none !bg-transparent !text-sm !shadow-none !outline-none focus:!ring-0"
                  className="flex items-center w-full rounded-xl border border-gray-200 px-3 py-2 bg-white shadow-sm focus-within:border-blue-500"
                  placeholder="Enter your phone number"
                />
              )}
            />
            {errors.phone && (
              <span className="text-xs text-red-500">{String(errors.phone.message)}</span>
            )}
          </div>

          {isError && (
            <p className="text-xs text-red-500 text-center">
              {error?.message || "An error occurred during registration"}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-blue-700 text-white font-medium p-3 rounded-xl transition duration-200 text-sm mt-2 disabled:opacity-50"
          >
            {isPending ? "Signing up..." : "Sign up"}
          </button>

          {/* Sign In */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <a href={PATHS.signIn} className="text-blue-600 font-medium">Sign in</a>
          </p>
        </form>
      </AuthLayout>
    </FormProvider>
  );
}