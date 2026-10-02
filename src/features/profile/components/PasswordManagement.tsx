import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  passwordManagementSchema,
  type PasswordManagementType,
} from "../schemas/profile-schema";
import { useChangePassword } from "../hooks/useProfile";

const inputClassName =
  "w-full rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-gray-400 focus:border-blue-500";
const labelClassName = "mb-2 block text-sm text-slate-600";

export default function PasswordManagement() {
  const changePassword = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordManagementType>({
    resolver: zodResolver(passwordManagementSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: PasswordManagementType) => {
    changePassword.mutate(data, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        reset();
      },
      onError: (err: any) =>
        toast.error(err?.response?.data?.message || "Failed to update password"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
      {/* Current password */}
      <div>
        <label htmlFor="current_password" className={labelClassName}>
          Current password
        </label>
        <input
          id="current_password"
          type="password"
          placeholder="Enter current password"
          {...register("current_password")}
          className={inputClassName}
        />
        {errors.current_password && (
          <span className="mt-1 block text-xs text-red-500">
            {errors.current_password.message}
          </span>
        )}
      </div>

      {/* New password */}
      <div>
        <label htmlFor="password" className={labelClassName}>
          New password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter new password"
          {...register("password")}
          className={inputClassName}
        />
        {errors.password && (
          <span className="mt-1 block text-xs text-red-500">{errors.password.message}</span>
        )}
      </div>

      {/* Confirm password */}
      <div>
        <label htmlFor="password_confirmation" className={labelClassName}>
          Confirm new password
        </label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Confirm new password"
          {...register("password_confirmation")}
          className={inputClassName}
        />
        {errors.password_confirmation && (
          <span className="mt-1 block text-xs text-red-500">
            {errors.password_confirmation.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <div className="lg:col-start-2">
        <button
          type="submit"
          disabled={changePassword.isPending}
          className="w-full rounded-[10px] bg-[#2563EB] px-8 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D5FD1] disabled:opacity-50"
        >
          {changePassword.isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
