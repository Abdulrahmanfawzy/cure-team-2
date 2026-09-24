import { container, faqs, sans, serif } from "@/types/home";
import { useState } from "react";


export function FAQ() {
    const [open, setOpen] = useState(null);
    return (
        <section className={`${container} py-16`}>
            <div className="text-center">
                <span className={`${sans} rounded-full bg-sky-50 px-3 py-1 text-[11px] text-[#0B5CC0]`}>Frequently Asked Questions</span>
                <h2 className={`${serif} mt-3 text-3xl`}>Got Questions ? We’ve got Answers!</h2>
            </div>
            <div className="mx-auto mt-10 max-w-200 space-y-4">
                {faqs.map(([q, a], i) => {
                    const isOpen = open === i;
                    return (
                        <div key={q} className="bg-neutral-100">
                            <h3>
                                <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`}
                                    // onClick={() => setOpen(isOpen ? null : i)}
                                    className={`${serif} flex w-full items-center justify-between px-4 py-4 text-left text-[17px]`}>
                                    {q}
                                    <span aria-hidden="true" className="relative ml-4 h-3.5 w-3.5 shrink-0">
                                        <span className="absolute left-0 top-1/2 h-px w-full bg-neutral-800" />
                                        <span className={`absolute left-1/2 top-0 h-full w-px bg-neutral-800 transition-transform ${isOpen ? "scale-y-0" : ""}`} />
                                    </span>
                                </button>
                            </h3>
                            <div id={`faq-${i}`} role="region"
                                className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <p className={`${sans} overflow-hidden px-4 text-sm leading-6 text-neutral-600 ${isOpen ? "pb-4" : ""}`}>{a}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}