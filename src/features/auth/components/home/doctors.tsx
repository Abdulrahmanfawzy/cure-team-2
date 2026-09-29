import { ClockIcon, Person, Star } from "@/components/shared/components/icons";
import { container, outline, primary, sans, serif } from "@/types/home";


const doctors = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: "Robert Johnson",
    spec: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    hours: "9:30am - 8:00pm",
    price: "$350",
    tone: ["bg-emerald-100 text-emerald-500", "bg-sky-100 text-sky-500", "bg-indigo-100 text-indigo-500", "bg-rose-100 text-rose-500", "bg-amber-100 text-amber-500"][i],
}));

function DoctorCard({ d }: any) {
    return (
        <article className="w-[320px] shrink-0 snap-start rounded-xl bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,.08)]">
            <div className="flex gap-3">
                <div className={`h-13 w-13 shrink-0 overflow-hidden rounded ${d.tone}`}><Person /></div>
                <div className={`${sans} min-w-0`}>
                    <h3 className={`${serif} text-sm`}>{d.name}</h3>
                    <p className="truncate text-[11px] text-neutral-500">{d.spec}</p>
                    <p className="mt-1 flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{d.rating}</span>
                        <span className="flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" />{d.hours}</span>
                    </p>
                </div>
            </div>
            <p className={`${sans} mt-2 flex justify-between text-xs`}>
                <span>Price<span className="text-[10px] text-neutral-400">/hour</span></span>
                <span className="text-[#0B5CC0]">{d.price}</span>
            </p>
            <a href="#" className={`${sans} ${primary} mt-2 block rounded-md py-2 text-center text-xs transition-colors`}>Book appointment</a>
        </article>
    );
}

export function TopDoctors() {
    return (
        <section className="py-10">
            <div className={`${container} flex items-start justify-between gap-6`}>
                <div>
                    <h2 className={`${serif} text-3xl`}>Top-Rated Doctors Chosen by Patients</h2>
                    <p className={`${sans} mt-3 max-w-105 text-[15px] leading-5 text-neutral-500`}>
                        Explore our highest-rated doctors, trusted by real patients for their expertise,
                        care, and service. Book with confidence today.
                    </p>
                </div>
                <a href="#" className={`${sans} ${outline} shrink-0 rounded-md px-6 py-2 text-xs transition-colors`}>View All</a>
            </div>

            <div className="mx-auto mt-8 max-w-310 overflow-hidden">
                <div className="flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
                    {doctors.map((d) => <DoctorCard key={d.id} d={d} />)}
                </div>
            </div>
        </section>
    );
}