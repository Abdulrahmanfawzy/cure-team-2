export interface CreateBookingPayload {
  doctor_id: string;
  slot_id: string;
  consultation_type: "in_person" | "online";
}