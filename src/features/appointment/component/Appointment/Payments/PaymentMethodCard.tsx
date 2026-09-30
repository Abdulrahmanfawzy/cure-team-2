import type { PaymentMethod } from "@/features/appointment/types/paymentMethods.types";


interface IProps {
  method: PaymentMethod;
  isSelected?: boolean;
  onSelect?: () => void;
}

const PaymentMethodCard = ({
  method,
  isSelected = false,
  onSelect,
}: IProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`mt-3 flex w-full items-center justify-between rounded-lg border p-3 text-left sm:p-4 ${
        isSelected
          ? "border-app-main bg-[#F7FAFF]"
          : "border-[#E5E7EB] bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D1D5DB]">
          {isSelected && (
            <span className="h-3 w-3 rounded-full bg-app-success" />
          )}
        </div>

        <span className="text-[15px] text-app-success">
          {method.brand?.toUpperCase?.() || "CARD"}
        </span>
      </div>

      <span className="font-bold text-app-main">
        •••• {method.last4}
      </span>
    </button>
  );
};

export default PaymentMethodCard;