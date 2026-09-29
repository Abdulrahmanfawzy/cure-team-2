import { useEffect } from "react";
import { Clock, Star, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { doctors as defaultDoctors } from "../constants/Sort";
import type { DoctorsType } from "../types/sort.type";

type DoctorCardProps = {
  doctor: DoctorsType;
  isSelected?: boolean;
  onSelect?: () => void;
};

function DoctorCard({ doctor, isSelected = false, onSelect }: DoctorCardProps) {
  return (
    <Card
      id={`doctor-card-${doctor.id}`}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
        isSelected
          ? "border-primary ring-2 ring-primary bg-primary/[0.03]"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className={`size-14 rounded-full object-cover transition-all ${
              isSelected ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150";
            }}
          />
          {isSelected && (
            <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-primary border-2 border-white" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium leading-tight truncate text-gray-900 group-hover:text-primary transition-colors">
              {doctor.name}
            </p>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {doctor.specialty} | {doctor.hospital}
          </p>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              {doctor.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {doctor.hours}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Price/hour</span>
        <span className="font-semibold text-red-500">${doctor.price}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button
          type="button"
          className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Book appointment
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          title="View on map"
          aria-label={`View ${doctor.name} on map`}
          className={`shrink-0 rounded-lg transition-colors ${
            isSelected
              ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white"
              : "text-primary hover:bg-primary/10 border-gray-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
        >
          <MapPin className="size-4" />
        </Button>
      </div>
    </Card>
  );
}

type DoctorsProps = {
  doctors?: DoctorsType[];
  selectedDoctorId?: number | null;
  onSelectDoctor?: (doctor: DoctorsType) => void;
  isMapOpen?: boolean;
};

export default function Doctors({
  doctors = defaultDoctors,
  selectedDoctorId = null,
  onSelectDoctor,
  isMapOpen = false,
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

  return (
    <div className="space-y-6 w-full">
      <div
        className={`grid gap-4 ${
          isMapOpen
            ? "grid-cols-1 xl:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctorId === doctor.id}
            onSelect={() => onSelectDoctor?.(doctor)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button variant="outline" className="rounded-lg px-8">
          Next Page
        </Button>
      </div>
    </div>
  );
}
