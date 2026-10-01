import { api } from "@/utils/axios";
import type { DoctorResponse } from "../types/docAppointment.types";
import type { AddPaymentMethodPayload, AddPaymentMethodResponse, CreatePaymentPayload, CreatePaymentResponse, PaymentMethodsResponse } from "../types/paymentMethods.types";
import type { CreateBookingPayload } from "../types/bookAppointment.types";



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
export const createPayment = async (
  payload: CreatePaymentPayload
): Promise<CreatePaymentResponse> => {
  const { data } = await api.post<CreatePaymentResponse>(
    "payments",
    
    payload
  );

  return data;
};
export const bookAppointment = async (
  data: CreateBookingPayload
) => {
  const response = await api.post(
    "bookings",
    data
  );

  return response.data;
};
export const addToFavourite = async(id:string) =>{
  console.log("doctor id:", id);
  const response = await api.post('favourites', {doctor_id:id});
   console.log("favourite response:", response.data);

  return response.data;
}