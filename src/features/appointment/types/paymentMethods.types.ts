export interface PaymentMethod {
  id: string;
  patient_id: string;
  card_token: string;
  brand: string;
  last4: string;
  is_default: boolean;
  created_at: string;
}

export interface PaymentMethodsResponse {
  success: boolean;
  message: string;
  data: PaymentMethod[];
}
export interface AddPaymentMethodPayload {
  card_token: string;
  brand: string;
  last4: string;
}

export interface AddPaymentMethodResponse {
  success: boolean;
  message: string;
  data: PaymentMethod;
}