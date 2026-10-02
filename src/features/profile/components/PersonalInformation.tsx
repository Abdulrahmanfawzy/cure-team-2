import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import {
  MONTHS,
  personalInfoSchema,
  type PersonalInfoType,
} from "../schemas/profile-schema";
import { useUpdateProfile } from "../hooks/useProfile";
import type { Profile } from "../types/profile.types";

const inputClassName =
  "w-full rounded-[10px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-gray-400 focus:border-blue-500";
const labelClassName = "mb-2 block text-sm text-slate-600";
const selectClassName =
  "w-full appearance-none rounded-[10px] bg-[#F3F4F6] px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-blue-500";

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const START_YEAR = 1940;
const END_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) =>
  String(END_YEAR - i)
);

interface PersonalInformationProps {
  profile?: Profile;
}

export default function PersonalInformation({ profile }: PersonalInformationProps) {
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      day: "",
      month: "",
      year: "",
    },
  });

  useEffect(() => {
    if (!profile) return;
    const [year, month, day] = (profile.birth_date || "").split("-");
    reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location ?? "",
      day: day ?? "",
      month: month ? MONTHS[Number(month) - 1] ?? "" : "",
      year: year ?? "",
    });
  }, [profile, reset]);

  const onSubmit = (data: PersonalInfoType) => {
    const hasDay = Boolean(data.day);
    const hasMonth = Boolean(data.month);
    const hasYear = Boolean(data.year);

    if ((hasDay || hasMonth || hasYear) && !(hasDay && hasMonth && hasYear)) {
      toast.error("Please select a complete birthday (day, month and year)");
      return;
    }

    const birth_date =
      hasDay && hasMonth && hasYear
        ? `${data.year}-${String(MONTHS.indexOf(data.month) + 1).padStart(2, "0")}-${data.day.padStart(2, "0")}`
        : null;

    updateProfile.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location?.trim() || null,
        birth_date,
      },
      {
        onSuccess: () => toast.success("Profile updated successfully"),
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Failed to update profile"),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className={labelClassName}>
          Full Name
        </label>
        <input id="name" type="text" placeholder="Seif Mohamed" {...register("name")} className={inputClassName} />
        {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name.message}</span>}
      </div>

      {/* Phone number */}
      <div>
        <label htmlFor="phone" className={labelClassName}>
          Phone number
        </label>
        <input id="phone" type="tel" placeholder="01*******09" {...register("phone")} className={inputClassName} />
        {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone.message}</span>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Seif Mohamed@gmail.com"
          {...register("email")}
          className={inputClassName}
        />
        {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email.message}</span>}
      </div>

      {/* Birthday */}
      <div>
        <span className={labelClassName}>Your birthday</span>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <select {...register("day")} className={selectClassName} aria-label="Day">
              <option value="">Day</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-700" />
          </div>
          <div className="relative">
            <select {...register("month")} className={selectClassName} aria-label="Month">
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-700" />
          </div>
          <div className="relative">
            <select {...register("year")} className={selectClassName} aria-label="Year">
              <option value="">Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-700" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="lg:col-span-2">
        <label htmlFor="location" className={labelClassName}>
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="129, El-Nasr Street, Cairo, Egypt"
          {...register("location")}
          className={inputClassName}
        />
        {errors.location && (
          <span className="mt-1 block text-xs text-red-500">{errors.location.message}</span>
        )}
      </div>

      {/* Save changes */}
      <div className="lg:col-start-2">
        <button
          type="submit"
          disabled={updateProfile.isPending}
          className="w-full rounded-[10px] bg-[#2563EB] px-8 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D5FD1] disabled:opacity-50"
        >
          {updateProfile.isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
