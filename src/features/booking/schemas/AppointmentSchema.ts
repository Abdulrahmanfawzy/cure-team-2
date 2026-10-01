import z from "zod";

export const cancelAppointmentSchema = z.object({
  cancel_reason: z
    .string()
    .trim()
    .min(1, "Please enter a reason")
    .max(500, "Reason must be less than 500 characters"),
});
export type CancelAppointmentFormValues = z.infer<
  typeof cancelAppointmentSchema
>;

export const supportSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters"),

  message: z
    .string()
    .trim()
    .min(1, "Please enter your message"),
});

export type SupportFormValues = z.infer<typeof supportSchema>;