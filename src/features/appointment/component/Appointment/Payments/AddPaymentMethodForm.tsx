import { useAddPaymentMethod } from "@/features/appointment/hooks/useAddpayMethod";
import { useState } from "react";

interface IProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddPaymentMethodForm = ({ onSuccess, onCancel }: IProps) => {
  const { mutate: addCard, isPending } = useAddPaymentMethod();

  const [cardNumber, setCardNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddCard = () => {
    const cleanCardNumber = cardNumber.replace(/\D/g, "");
    const cleanBrand = (brand || "visa").trim().toLowerCase();
    const last4 = cleanCardNumber.slice(-4);

    if (!cleanCardNumber) return;

    addCard(
      {
        card_token: `tok_${cleanBrand}_${last4}`,
        brand: cleanBrand,
        last4,
      },
      {
        onSuccess: () => {
          setCardNumber("");
          setBrand("");
          setExpiryDate("");
          setCvv("");

          onSuccess?.();
        },
      }
    );
  };

  return (
    <div className="mt-4 rounded-lg border border-[#E5E7EB] p-3 sm:p-4">
      <h3 className="text-[14px] font-medium text-[#111827] sm:text-[16px]">
        Add New Card
      </h3>

      <div className="mt-3 flex flex-col gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="h-11 rounded-lg border border-[#D1D5DB] px-3 outline-none"
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="h-11 rounded-lg border border-[#D1D5DB] px-3 outline-none"
        />

        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#D1D5DB] px-3 text-sm outline-none sm:h-11"
          />

          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#D1D5DB] px-3 text-sm outline-none sm:h-11"
          />
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 flex-1 rounded-lg border border-[#D1D5DB] text-sm sm:h-11"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddCard}
            disabled={isPending}
            className="h-10 flex-1 rounded-lg bg-app-main text-sm text-white disabled:opacity-50 sm:h-11"
          >
            {isPending ? "Adding..." : "Add Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodForm;