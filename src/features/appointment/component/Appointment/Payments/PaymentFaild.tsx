import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {



}

const PaymentFaildPage=({}:IProps)=> {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10 font-montserrat">
      <div className="w-full max-w-md rounded-[28px] bg-white px-6 py-10 text-center shadow-[0px_10px_40px_rgba(0,0,0,0.08)]">

        {/* Failed Icon */}
        {/* Failed Icon */}
<div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-[#FFF0F1]">
  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-app-error">
    <X
      size={48}
      strokeWidth={3}
      className="text-white animate-[checkIn_0.5s_ease-out]"
    />
  </div>
</div>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-semibold text-[#1F2937]">
          Payment Failed
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-[320px] text-sm leading-6 text-[#6B7280]">
          We couldn't complete your payment. Please check your payment
          details and try again.
        </p>

        {/* Warning */}
        <div className="mt-7 rounded-2xl bg-[#FFF7F7] px-4 py-3 text-sm text-app-error">
          No amount has been charged from your account.
        </div>

        {/* CTA */}
        <Link
          to='/search-doctor'
          type="button"
          className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-app-error text-sm font-medium text-white transition hover:opacity-90"
        >
          Try Payment Again
          <ArrowRight size={17} />
        </Link>

        {/* Back Home */}
        <Link
          to='/'
          className="mt-4 text-sm font-medium text-[#6B7280] transition hover:text-app-main"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default PaymentFaildPage