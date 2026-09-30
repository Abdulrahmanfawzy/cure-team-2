import { api } from "@/utils/axios";
import type { DoctorResponse } from "../types/docAppointment.types";
import type { AddPaymentMethodPayload, AddPaymentMethodResponse, PaymentMethodsResponse } from "../types/paymentMethods.types";



export const fetchDoctorDetails = async (id: string): Promise<DoctorResponse> => {


    const result = await api.get<DoctorResponse>(`doctor/${id}`);
    return result.data;

}

export const fetchPaymentMethods=async():Promise <PaymentMethodsResponse>=>{
     const result = await api.get<PaymentMethodsResponse>(`payment-methods`);
     return result.data;

}
export const addPaymentMethod = async (
  payload: AddPaymentMethodPayload
): Promise<AddPaymentMethodResponse> => {
  const result = await api.post<AddPaymentMethodResponse>(
    "store-payment-methods",
    {
      card_token: payload.card_token,
      brand: payload.brand,
      last4: payload.last4,
    }
  );

  return result.data;
};