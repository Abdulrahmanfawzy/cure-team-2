import { CalIcon, Person, PinIcon } from "@/components/shared/components/icons";
import { container, outline, primary, sans, serif } from "@/types/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 text-center">
      {/* concentric rings */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 -top-30 z-0 -translate-x-1/2">
        {[1000, 700, 380].map((s) => (
          <div key={s} style={{ width: s, height: s }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200/70" />
        ))}
        <div className="h-250 w-250" />
      </div>

      <div className={`${container} relative`}>
        {/* floating pieces (desktop) */}
        <div className="absolute left-[8%] top-28 hidden flex-col items-center gap-2 rounded-xl bg-white px-6 py-4 shadow-md lg:flex">
          <PinIcon className="h-6 w-6 fill-[#0B5CC0] text-[#0B5CC0]" />
          <span className={`${serif} text-xs`}>Doctors near you</span>
        </div>
        <div className="absolute right-[10%] top-67.5 hidden lg:block">
          <svg viewBox="0 0 24 24" className="h-6 w-6 -rotate-12 fill-[#0B5CC0]"><path d="M3 3l18 7-8 3-3 8z" /></svg>
          <span className={`${serif} -ml-1 mt-1 inline-block rotate-20 rounded bg-white px-3 py-1 text-sm shadow`}>Book Now</span>
        </div>

        <span className={`${sans} inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-[11px] text-neutral-700`}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#0B5CC0]" /> Upgrade your account
        </span>

        <h1 className={`${serif} mx-auto mt-5 max-w-180 text-4xl leading-tight sm:text-5xl`}>
          Find and book top doctors near you
        </h1>
        <p className={`${sans} mx-auto mt-6 max-w-130 text-[17px] leading-7 text-neutral-500`}>
          Easily find top-rated specialists near you and book appointments in just a few clicks.
          Whether you need an in-person visit consultation, we're here to connect you with the
          right care—fast, simple, and secure.
        </p>

        <div className={`${sans} mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm`}>
          <span className="flex -space-x-2">
            {["bg-amber-300", "bg-sky-300", "bg-rose-300"].map((c, i) => (
              <span key={i} className={`h-6 w-6 overflow-hidden rounded-full border-2 border-white ${c} text-white`}><Person /></span>
            ))}
          </span>
          10k+ happy patients
        </div>

        <div className={`${sans} mt-7 flex flex-wrap items-center justify-center gap-4`}>
          <a href="#" className={`${primary} rounded-md px-12 py-3 text-sm transition-colors`}>Get started</a>
          <a href="#" className={`${outline} inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm transition-colors`}>
            <CalIcon /> Book Appointment
          </a>
        </div>
      </div>
    </section>
  );
}