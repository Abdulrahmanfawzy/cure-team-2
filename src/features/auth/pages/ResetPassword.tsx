import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import { PATHS } from "../../../app/router/paths";
import { resetPasswordSchema, type ResetPasswordType } from "../schemas/auth-schemas";
export default function ResetPasswordPage() {
  const navigate = useNavigate();

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

  const onSubmit = (data: ResetPasswordType) => {
    console.log("Reset Password Data:", data);

    // Temporary until we connect the API
    navigate(PATHS.signIn);
  };

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
          <label className="block mb-2 text-sm font-medium">
            New Password
          </label>

          <input
            type="password"
            {...register("password")}
            placeholder="Enter new password"
            className="w-full p-3 border rounded-xl"
          />

          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            {...register("password_confirmation")}
            placeholder="Confirm new password"
            className="w-full p-3 border rounded-xl"
          />

          {errors.password_confirmation && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-xl"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}