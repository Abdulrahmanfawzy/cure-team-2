import useGetPaymentMethods from "@/features/appointment/hooks/useGetPaymentMethods";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import PaymentDoctorInfo from "./PaymentDoctorInfo";
import PaymentMethodList from "./PaymentMethodList";
import PaymentSummary from "./PaymentSummary";
import { useState, type Dispatch, type SetStateAction } from "react";

import type {
    Doctor,
    Slot,
} from "@/features/appointment/types/docAppointment.types";
import useCreatePayment from "@/features/appointment/hooks/useCreatePayment";


interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    selectedDate: Date;
    selectedSlot: Slot | null;
    doctor: Doctor;
    bookingId: string;
    onClose: () => void;
}

const PaymentPanel = ({
    isOpen,
    setIsOpen,
    selectedDate,
    selectedSlot,
    doctor, bookingId,
    onClose,
}: IProps) => {
    const { data: paymentMethods, isLoading, isError, error } = useGetPaymentMethods();
    const { mutate: createPayment ,isPending} = useCreatePayment();
   

    const [isAddingCard, setIsAddingCard] = useState(false);
    const [selectedMethodId, setSelectedMethodId] = useState<string | undefined>(undefined);
   

    const savedPaymentMethods = Array.isArray(paymentMethods?.data)
        ? paymentMethods.data
        : [];

    if (!isOpen || !selectedSlot) return null;
// --------modal after pay--------



// ---------------------------------
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-white p-6 text-sm text-[#145DB8]">
                    Loading payment methods...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                <div className="rounded-lg bg-white p-6 text-sm text-app-error">
                    {error instanceof Error
                        ? error.message
                        : "Some problem loading payment methods"}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex">
            <div
                className="flex-1 bg-black/30"
                onClick={onClose}
            />

            <div className="w-full max-w-105 overflow-y-auto bg-white p-4 sm:p-6">

                <PaymentDoctorInfo
                    doctor={doctor}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    onReschedule={() => setIsOpen(false)}
                />

                <div className="mt-5 sm:mt-8">
                    <h2 className="text-[16px] font-medium sm:text-[20px]">
                        Payment Method
                    </h2>

                    <PaymentMethodList
                        methods={savedPaymentMethods}
                        selectedMethodId={selectedMethodId}
                        onSelect={setSelectedMethodId}
                    />

                    {!isAddingCard && (
                        <button
                            type="button"
                            onClick={() => setIsAddingCard(true)}
                            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#145DB8] text-[13px] text-[#145DB8] sm:h-12"
                        >
                            <span className="text-xl">+</span>
                            Add new card
                        </button>
                    )}

                    {isAddingCard && (
                        <AddPaymentMethodForm
                            onSuccess={() => setIsAddingCard(false)}
                            onCancel={() => setIsAddingCard(false)}
                        />
                    )}
                </div>

                <PaymentSummary
                    price={doctor.consultation_price}
                    disabled={isPending }
                    onPay={() => {
                       

                        createPayment(
                            {
                                booking_id: bookingId!,
                            },
                            {
                                onSuccess: (response) => {
                                    if (response?.data?.url) {
                                        window.location.href = response.data.url;
                                        
                                    }
                                },
                            }
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default PaymentPanel;