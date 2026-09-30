interface IProps {
  price: number;
  onPay: () => void;
}

const PaymentSummary = ({ price, onPay }: IProps) => {
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
        className="mt-2 h-11 w-full rounded-lg bg-app-main text-sm text-white sm:h-12"
      >
        Pay {price}$
      </button>
    </div>
  );
};

export default PaymentSummary;