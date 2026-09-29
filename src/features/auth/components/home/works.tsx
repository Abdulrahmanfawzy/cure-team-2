import { ArrowL, ArrowR, SearchIcon } from "@/components/shared/components/icons";
import { container, sans, serif } from "@/types/home";


const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function StepCard({ title, text, children }: any) {
  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-300 bg-white">
      <div className="h-50 p-4">{children}</div>
      <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3">
        <h3 className={`${serif} text-base`}>{title}</h3>
        <p className={`${sans} mt-1 text-[11px] leading-4 text-neutral-500`}>{text}</p>
      </div>
    </article>
  );
}

export function HowItWorks() {
  return (
    <section className={`${container} py-10`}>
      <h2 className={`${serif} text-center text-3xl`}>How it works</h2>
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        <StepCard title="Search for a Doctor"
          text="Easily browse by specialty, location, or doctor name to find the right healthcare provider for your needs.">
          <div className="relative h-full overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-9 place-items-center text-[10px] text-sky-400 [&>span:nth-child(3n)]:text-[#0B5CC0] [&>span:nth-child(2n)]:text-neutral-300">
              {Array.from({ length: 45 }).map((_, i) => <span key={i}>✦</span>)}
            </div>
            <div className={`${sans} absolute inset-x-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-500`}>
              <SearchIcon className="h-3.5 w-3.5" /> Search by specialty
            </div>
          </div>
        </StepCard>

        <StepCard title="Choose a Date & Time"
          text="View real-time availability and pick a slot that works best for your schedule.">
          <div className={`${sans} h-full rounded-xl border border-neutral-200 p-3`}>
            <div className="flex items-center justify-between text-sm"><ArrowL /> July 2025 <ArrowR /></div>
            <div className="mt-4 grid grid-cols-7 text-center text-[10px] text-[#0B5CC0]">
              {days.map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="mt-3 grid grid-cols-7 place-items-center gap-1 text-[10px]">
              <span />
              {[9, 11, 12, 13, 14].map((n) => (
                <span key={n} className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-400">{n}</span>
              ))}
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-100 text-neutral-800">15</span>
            </div>
          </div>
        </StepCard>

        <StepCard title="Book & Pay Online"
          text="Confirm your appointment and pay securely using various payment options—credit card, mobile wallet.">
          <div className={`${sans} flex h-full flex-col justify-center gap-3 text-[10px]`}>
            {[
              ["Pay", "Quick checkout with your Apple device", "ml-8"],
              ["VISA", "Secure and fast card payments", "ml-2"],
              ["P", "Easy and safe with your PayPal account", "ml-8"],
            ].map(([tag, label, offset]) => (
              <div key={tag} className={`${offset} flex items-center gap-2 rounded-md border border-neutral-100 bg-white px-2 py-1.5 shadow-sm`}>
                <b className="rounded bg-[#0B5CC0] px-1 text-[8px] text-white">{tag}</b> {label}
              </div>
            ))}
          </div>
        </StepCard>
      </div>
    </section>
  );
}