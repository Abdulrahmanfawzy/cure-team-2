interface IProps {
  price: number;
  onPay: () => void;
  disabled?: boolean;
}

const PaymentSummary = ({ price, onPay, disabled = false }: IProps) => {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:gap-4">
      <div className="mt-4 flex items-center justify-between sm:mt-8">
        <div>
          <span className="text-[18px] font-medium sm:text-[24px]">
            Price
          </span>

          <span className="ml-1 text-[9px] text-[#99A2AB] sm:text-[10px]">
            /hour
          </span>
        </div>

        <span className="text-[14px] font-medium text-error sm:text-[16px]">
          {price}$
        </span>
      </div>

      <button
        type="button"
        onClick={onPay}
        disabled={disabled}
        className="mt-2 h-11 w-full rounded-lg bg-app-main text-sm text-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-12"
      >
        {disabled ? "Processing..." : `Pay ${price}$`}
      </button>
    </div>
  );
};

export default PaymentSummary;