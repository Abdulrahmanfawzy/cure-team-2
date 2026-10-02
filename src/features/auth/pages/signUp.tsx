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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../app/router/paths";

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    mutate: registerUser,
    isPending,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (_response, variables) => {
      sessionStorage.setItem("register_phone", variables.phone);
      sessionStorage.setItem("auth_flow", "register");

      const params = new URLSearchParams({ phone: variables.phone });
      navigate(`${PATHS.codeVerfication}?${params.toString()}`, {
        replace: true,
        state: { flow: "register" },
      });
    },
    onError: (err: any) => {
      console.log("========== REGISTER ERROR ==========", err.response?.data);
      toast.error(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    },
  });

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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

          {/* Phone Number */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium text-sm text-gray-700">Phone Number</label>
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
              <span className="text-xs text-red-500">{String(errors.phone.message)}</span>
            )}
          </div>

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