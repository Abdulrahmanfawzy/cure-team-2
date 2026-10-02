import { Children, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import { container, outline, primary, sans, serif } from "@/types/home";
import { PATHS } from "@/app/router/paths";
import { useSearch } from "@/features/Search-Doctor/hooks/useSearch";
import type { DoctorsType } from "@/features/Search-Doctor/types/sort.type";
import { baseUrl } from "@/features/Search-Doctor/components/Choose";
import NotFoundDoctors from "@/features/Search-Doctor/ui/NotFoundDoctors";

const MAX_DOCTORS = 6;

function DoctorCardHome({ doctor }: { doctor: DoctorsType }) {
    return (
        <article className="w-full snap-start rounded-xl bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,.08)]">
            <div className="flex gap-3">
                <img
                    src={`${baseUrl}${doctor.profile_image}`}
                    alt={doctor.name}
                    className="h-13 w-13 shrink-0 rounded-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150";
                    }}
                />
                <div className={`${sans} min-w-0`}>
                    <h3 className={`${serif} text-sm`}>{doctor.name}</h3>
                    <p className="truncate text-[11px] text-neutral-500">
                        {doctor.specialist?.name || "Specialist"} | {doctor.hospital}
                    </p>
                    <p className="mt-1 flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            {doctor.rating_avg || "4.8"}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {doctor.opening_hours || "Available"}
                        </span>
                    </p>
                </div>
            </div>
            <p className={`${sans} mt-2 flex justify-between text-xs`}>
                <span>Price<span className="text-[10px] text-neutral-400">/hour</span></span>
                <span className="text-[#0B5CC0]">${doctor.consultation_price}</span>
            </p>
            <Link to={`/appointment/${doctor.id}`} className={`${sans} ${primary} mt-2 block rounded-md py-2 text-center text-xs transition-colors`}>
                Book appointment
            </Link>
        </article>
    );
}

function DoctorCardSkeleton() {
    return (
        <div className="w-full snap-start rounded-xl bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,.08)]">
            <div className="flex gap-3">
                <Skeleton className="h-13 w-13 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex gap-4">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="mt-2 h-8 w-full rounded-md" />
        </div>
    );
}

function SectionHeader() {
    return (
        <div className={`${container} flex items-start justify-between gap-6`}>
            <div>
                <h2 className={`${serif} text-3xl`}>Top-Rated Doctors Chosen by Patients</h2>
                <p className={`${sans} mt-3 max-w-105 text-[15px] leading-5 text-neutral-500`}>
                    Explore our highest-rated doctors, trusted by real patients for their expertise,
                    care, and service. Book with confidence today.
                </p>
            </div>
            <Link
                to={PATHS.searchDoctor}
                className={`${sans} ${outline} shrink-0 rounded-md px-6 py-2 text-xs transition-colors`}
            >
                View All
            </Link>
        </div>
    );
}

function DoctorsRow({ children }: { children: ReactNode }) {
    return (
        <div className={`${container} mt-8`}>
            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {Children.map(children, (child) => (
                        <CarouselItem className="pl-4 basis-[calc(100%-0.5rem)] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            {child}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-x-1/2 border-[#0B5CC0] text-[#0B5CC0] shadow-md" />
                <CarouselNext className="right-0 translate-x-1/2 border-[#0B5CC0] text-[#0B5CC0] shadow-md" />
            </Carousel>
        </div>
    );
}

export function TopDoctors() {
    const searchParams = new URLSearchParams();
    searchParams.set("page", "1");

    const { data, isLoading, isError, refetch } = useSearch(searchParams, 1);

    const doctors: DoctorsType[] = Array.isArray(data?.data)
        ? data.data.slice(0, MAX_DOCTORS)
        : Array.isArray(data)
            ? data.slice(0, MAX_DOCTORS)
            : [];

    if (isLoading) {
        return (
            <section className="py-10" aria-label="Top rated doctors loading">
                <SectionHeader />
                <DoctorsRow>
                    {Array.from({ length: MAX_DOCTORS }).map((_, i) => (
                        <DoctorCardSkeleton key={i} />
                    ))}
                </DoctorsRow>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-10" aria-label="Top rated doctors error">
                <SectionHeader />
                <div className="mx-auto mt-8 max-w-310 overflow-hidden">
                    <NotFoundDoctors
                        type="error"
                        onRetry={refetch}
                        className="min-h-[300px]"
                    />
                </div>
            </section>
        );
    }

    if (doctors.length === 0) {
        return (
            <section className="py-10" aria-label="Top rated doctors empty">
                <SectionHeader />
                <div className="mx-auto mt-8 max-w-310 overflow-hidden">
                    <NotFoundDoctors
                        type="empty"
                        className="min-h-[300px]"
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="py-10" aria-label="Top rated doctors">
            <SectionHeader />
            <DoctorsRow>
                {doctors.map((doctor) => (
                    <DoctorCardHome key={doctor.id} doctor={doctor} />
                ))}
            </DoctorsRow>
        </section>
    );
}
