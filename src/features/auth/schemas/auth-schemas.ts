import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  password: z.string().min(7, "Password must be at least 7 characters"),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export type RegisterType = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(7, "Password must be at least 7 characters"),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;