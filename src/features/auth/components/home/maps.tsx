import { useRef, useState } from "react";
import { SearchIcon } from "@/components/shared/components/icons";
import { container, outline, sans, serif } from "@/types/home";
import { useSearch } from "@/features/Search-Doctor/hooks/useSearch";
import DoctorsMap from "@/features/Search-Doctor/components/MAP/DoctorsMap";
import type { DoctorsType } from "@/features/Search-Doctor/types/sort.type";

export function FindCare() {
    const [showDoctors, setShowDoctors] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);

    // Same query as TopDoctors (same queryKey) → shared cache, no extra request
    const searchParams = new URLSearchParams();
    searchParams.set("page", "1");
    const { data } = useSearch(searchParams, 1);

    const doctors: DoctorsType[] = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
            ? data
            : [];

    const handleSearchByLocation = () => {
        setShowDoctors(true);
        mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsMapOpen(true);
    };

    return (
        <section className={`${container} grid items-center gap-10 py-24 md:grid-cols-2`}>
            <div>
                <h2 className={`${serif} text-4xl leading-tight`}>Find Care Near You<br />in Seconds</h2>
                <p className={`${sans} mt-8 max-w-[320px] text-[15px] leading-6 text-neutral-500`}>
                    Allow location access or choose your city to instantly discover trusted doctors and
                    clinics around you—quick, easy, and local.
                </p>
                <button
                    type="button"
                    onClick={handleSearchByLocation}
                    aria-pressed={showDoctors}
                    className={`${sans} ${outline} mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs transition-colors`}
                >
                    <SearchIcon className="h-3.5 w-3.5" /> Search by location
                </button>
            </div>

            {/* live map with doctors' published locations */}
            <div
                ref={mapRef}
                aria-label="Map showing nearby doctors"
                className="h-82.5 overflow-hidden rounded-3xl"
            >
                <DoctorsMap
                    doctors={showDoctors ? doctors : []}
                    className="h-full min-h-0 rounded-3xl"
                />
            </div>

            {/* Map Modal — same pattern as search-doctors page */}
            {isMapOpen && (
                <>
                    {/* Background Overlay */}
                    <div
                        className="fixed inset-0 z-99999 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsMapOpen(false)}
                    />

                    {/* Responsive Map Modal */}
                    <div className="fixed inset-3 sm:inset-6 md:inset-10 lg:inset-16 z-999999 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-full max-w-5xl pointer-events-auto rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col">
                            <DoctorsMap
                                doctors={showDoctors ? doctors : []}
                                onClose={() => setIsMapOpen(false)}
                            />
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
