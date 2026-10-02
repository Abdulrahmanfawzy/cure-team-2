import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().optional(),
  day: z.string(),
  month: z.string(),
  year: z.string(),
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;

export const passwordManagementSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(7, "Password must be at least 7 characters"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export type PasswordManagementType = z.infer<typeof passwordManagementSchema>;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
