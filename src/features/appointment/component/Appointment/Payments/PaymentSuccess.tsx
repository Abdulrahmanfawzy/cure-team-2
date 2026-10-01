import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {



}

const PaymentSuccessPage = ({ }: IProps) => {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-10 font-montserrat">
            <div className="w-full max-w-md rounded-[28px] bg-white px-6 py-10 text-center shadow-[0px_10px_40px_rgba(0,0,0,0.08)]">

                
                {/* Success Icon */}
                <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-[#EAF8EF]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-app-success">
                        <Check
                            size={48}
                            strokeWidth={3}
                            className="text-white animate-[checkIn_0.5s_ease-out]"
                        />
                    </div>
                </div>

                {/* Title */}
                <h1 className="mb-3 text-2xl font-semibold text-[#1F2937]">
                    Payment Successful!
                </h1>

                {/* Description */}
                <p className="mx-auto max-w-[320px] text-sm leading-6 text-[#6B7280]">
                    Your payment has been completed successfully. Your appointment is
                    now confirmed.
                </p>

                {/* Appointment Info */}
                <div className="mt-7 rounded-2xl bg-[#F8FAFC] p-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F1FB]">
                            <CalendarDays size={20} className="text-app-main" />
                        </div>

                        <div>
                            <p className="text-xs text-[#99A2AB]">
                                Appointment
                            </p>

                            <p className="text-sm font-medium text-[#1F2937]">
                                Your appointment is confirmed
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <Link 
                   to="/booking"
                    type="button"
                    className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-app-main text-sm font-medium text-white transition hover:opacity-90"
                >
                    View My Appointments
                    <ArrowRight size={17} />
                </Link>

                {/* Back Home */}
                <Link
                to="/"
                    type="button"
                    className="mt-6 text-sm font-medium text-[#6B7280] transition hover:text-app-main"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );

}

export default PaymentSuccessPage