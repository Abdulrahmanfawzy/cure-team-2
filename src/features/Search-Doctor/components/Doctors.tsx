import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { DoctorsType } from "../types/sort.type";
import DoctorCard from "./DoctorCard";
import DoctorsNotFound from "../ui/NotFoundDoctors";
import DoctorsSkeleton from "../ui/DoctorsSkeleton";

type DoctorsProps = {
  doctors?: DoctorsType[] | any;
  doctorsList?: DoctorsType[] | any;
  selectedDoctorId?: number | null;
  onSelectDoctor?: (doctor: DoctorsType) => void;
  isMapOpen?: boolean;
  handelNextPage?: () => void;
  isLoading?: boolean;
  /** Hide "Next Page" when the current page is the last one. */
  hasNextPage?: boolean;
};

export default function Doctors({
  doctors,
  selectedDoctorId = null,
  onSelectDoctor,
  isMapOpen = false,
  handelNextPage,
  isLoading = false,
  hasNextPage = false,
}: DoctorsProps) {
  // Auto-scroll selected doctor into view when clicked from map
  useEffect(() => {
    if (selectedDoctorId) {
      const cardEl = document.getElementById(`doctor-card-${selectedDoctorId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedDoctorId]);

  const gridClass = `grid gap-4 ${
    isMapOpen
      ? "grid-cols-1 xl:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  }`;

  // Loading state — skeleton grid matching the real cards
  if (isLoading) {
    return <DoctorsSkeleton className={gridClass} />;
  }

  // Safely extract doctor array whether passed as doctors or doctorsList,
  // and whether it's raw array or API response envelope ({ data: [...] })
  const list: DoctorsType[] = Array.isArray(doctors?.data)
    ? doctors.data
    : Array.isArray(doctors)
      ? doctors
      : []
  return (
    <div className="space-y-6 w-full">
      {list.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <DoctorsNotFound type="empty"/>
        </div>
      ) : (
        <div className={gridClass}>
          {list.map((doctor: DoctorsType) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              isSelected={selectedDoctorId === doctor.id}
              onSelect={() => onSelectDoctor?.(doctor)}
            />
          ))}
        </div>
      )}

      {list.length > 0 && hasNextPage && handelNextPage && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="rounded-lg px-8"
            onClick={handelNextPage}
          >
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
}
