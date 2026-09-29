import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { DoctorsType } from "../types/sort.type";
import DoctorCard from "./DoctorCard";
import { doctors as defaultDoctors } from "../constants/Sort";

type DoctorsProps = {
  doctors?: DoctorsType[] | any;
  doctorsList?: DoctorsType[] | any;
  selectedDoctorId?: number | null;
  onSelectDoctor?: (doctor: DoctorsType) => void;
  isMapOpen?: boolean;
};

export default function Doctors({
  doctors,
  doctorsList,
  selectedDoctorId = null,
  onSelectDoctor,
  isMapOpen = false,
  handelNextPage
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

  // Safely extract doctor array whether passed as doctors or doctorsList,
  // and whether it's raw array or API response envelope ({ data: [...] })
  const rawList = doctorsList ?? doctors;
  const list: DoctorsType[] = Array.isArray(rawList)
    ? rawList
    : Array.isArray(rawList?.data)
    ? rawList.data
    : defaultDoctors;

  return (
    <div className="space-y-6 w-full">
      <div
        className={`grid gap-4 ${
          isMapOpen
            ? "grid-cols-1 xl:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {list.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctorId === doctor.id}
            onSelect={() => onSelectDoctor?.(doctor)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-2" >
        <Button variant="outline" className="rounded-lg px-8" onClick={handelNextPage}>
          Next Page
        </Button>
      </div>
    </div>
  );
}
