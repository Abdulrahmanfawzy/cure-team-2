import { company, sans, serif, support } from "@/types/home";
import { contacts, Logo, socials } from "./components/icons";
import LinkColumn from "./components/link-column";
import { DownloadCTA } from "@/features/auth/components/home/health";

export default function Footer() {
    return (
        <>
            <footer className="bg-[#03162C] text-white px-20 relative mt-60">
                <div className="absolute -top-60 right-0 left-0"><DownloadCTA /></div>
                <div className="mx-auto max-w-310 px-6 pb-10 pt-25 sm:px-10 lg:px-0">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-x-15">
                        {/* Brand */}
                        <div className="max-w-82.5 lg:mr-30">
                            <div className="flex items-center gap-4">
                                <Logo />
                                <span className={`${serif} text-[32px]`}>Cure</span>
                            </div>
                            <p className={`${serif} mt-6 text-[18px] leading-6`}>
                                Cure helps you find trusted doctors, book appointments, and manage your
                                health—quickly and easily.
                            </p>
                            <div className="mt-8 flex gap-4">
                                {socials.map((s) => (
                                    <a key={s.name} href="#" aria-label={s.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white transition-transform hover:-translate-y-0.5">
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <LinkColumn title="Company" items={company} />
                        <LinkColumn title="Support" items={support} />

                        {/* Contact */}
                        <div className="lg:min-w-60">
                            <h3 className={`${serif} text-[22px] leading-8`}>Contact Info</h3>
                            <ul className={`${sans} mt-5 space-y-4`}>
                                {contacts.map((c) => (
                                    <li key={c.label} className="grid grid-cols-[16px_1fr] gap-x-4">
                                        <span className="mt-0.5">{c.icon}</span>
                                        <span className="text-[15px]">{c.label}</span>
                                        <span />
                                        <span className="mt-1 text-[13px] leading-4.25">
                                            {c.value.map((line) => (
                                                <span key={line} className="block">{line}</span>
                                            ))}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className={`${serif} mt-14 flex flex-col gap-3 text-[15px] sm:flex-row sm:items-center sm:justify-between`}>
                        <p>@2024 Techvio - All Right Reserved</p>
                        <p>
                            <a href="#" className="hover:underline">Terms &amp; Condition | </a>
                            <a href="#" className="hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </footer>

        </>
    );
}
