import { Person, Star } from "@/components/shared/components/icons";
import { container, reviews, serif } from "@/types/home";
import { useState } from "react";

export function Reviews() {
    const [active, setActive] = useState(2);
    return (
        <section className={`${container} py-16 text-center`}>
            <h2 className={`${serif} text-3xl leading-tight`}>Reviews<br />That Speak for Themselves</h2>
            <div className="mt-12 flex justify-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" />)}
            </div>
            <p key={active} aria-live="polite" className={`${serif} mx-auto mt-6 max-w-[320px] text-[17px] leading-6 text-neutral-500`}>
                “{reviews[active].quote}”
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
                {reviews.map((r, i) => (
                    <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Show review ${i + 1}`} aria-pressed={i === active}
                        className={`overflow-hidden rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${r.tone}
              ${i === active ? "h-22 w-22" : "h-17 w-17 opacity-90"}`}>
                        <Person />
                    </button>
                ))}
            </div>
        </section>
    );
}