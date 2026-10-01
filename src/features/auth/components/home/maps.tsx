import { Person, PinIcon, SearchIcon } from "@/components/shared/components/icons";
import { container, outline, sans, serif } from "@/types/home";


function MapPin({ className }: any) {
    return (
        <div className={`absolute flex h-12 w-10 items-start justify-center rounded-t-full rounded-b-[60%] bg-neutral-800 pt-1 shadow-lg ${className}`}>
            <span className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-sky-100 text-sky-500"><Person /></span>
        </div>
    );
}

export function FindCare() {
    return (
        <section className={`${container} grid items-center gap-10 py-24 md:grid-cols-2`}>
            <div>
                <h2 className={`${serif} text-4xl leading-tight`}>Find Care Near You<br />in Seconds</h2>
                <p className={`${sans} mt-8 max-w-[320px] text-[15px] leading-6 text-neutral-500`}>
                    Allow location access or choose your city to instantly discover trusted doctors and
                    clinics around you—quick, easy, and local.
                </p>
                <a href="#" className={`${sans} ${outline} mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs transition-colors`}>
                    <SearchIcon className="h-3.5 w-3.5" /> Search by location
                </a>
            </div>

            {/* stylised map */}
            <div role="img" aria-label="Map showing nearby doctors"
                className="relative h-82.5 overflow-hidden rounded-3xl bg-[#e9efe6]">
                <div className="absolute -left-8 top-24 h-40 w-40 rounded-full bg-[#aadaff]" />
                <div className="absolute left-24 top-16 h-44 w-24 rotate-12 rounded-[40%] bg-[#aadaff]" />
                <div className="absolute left-[18%] top-0 h-full w-3 bg-amber-300" />
                <div className="absolute left-0 top-[70%] h-2 w-full -rotate-6 bg-white" />
                <div className="absolute left-[55%] top-0 h-full w-2 rotate-6 bg-white" />
                <div className="absolute right-0 top-10 h-40 w-32 bg-[#cfe8c8]" />
                <div className="absolute bottom-4 left-0 h-28 w-40 bg-[#cfe8c8]" />
                <PinIcon className="absolute left-[9%] top-[60%] h-7 w-7 fill-red-500 text-red-600" />
                <MapPin className="left-[18%] top-[35%]" />
                <MapPin className="left-[73%] top-[12%]" />
                <MapPin className="left-[80%] top-[70%]" />
            </div>
        </section>
    );
}