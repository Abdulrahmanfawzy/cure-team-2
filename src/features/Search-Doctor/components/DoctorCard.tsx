import { Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DoctorsType } from "../types/sort.type";


type DoctorCardProps = {
  doctor: DoctorsType;
  isSelected?: boolean;
  onSelect?: () => void;
};

export default function DoctorCard({ doctor, isSelected = false, onSelect }: DoctorCardProps) {

  return (
    <Card
      id={`doctor-card-${doctor.id}`}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
        isSelected
          ? "border-[#3F3D9E] ring-2 ring-[#3F3D9E] bg-[#3F3D9E]/[0.03]"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={doctor.profile_image || (doctor as any).image}
            alt={doctor.name}
            className={`size-14 rounded-full object-cover transition-all ${
              isSelected ? "ring-2 ring-[#3F3D9E] ring-offset-2" : ""
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150";
            }}
          />
          {isSelected && (
            <span className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-[#3F3D9E] border-2 border-white" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium leading-tight truncate text-gray-900 group-hover:text-[#3F3D9E] transition-colors">
              {doctor.name}
            </p>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {doctor.specialist?.name || (doctor as any).specialty || "Specialist"} | {doctor.hospital}
          </p>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              {doctor.rating_avg || doctor.rating_count || (doctor as any).rating || "4.8"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {doctor.opening_hours || (doctor as any).hours || "Available"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Price/hour</span>
        <span className="font-semibold text-red-500">${doctor.consultation_price ?? (doctor as any).price ?? "50"}</span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button
          type="button"
          className="flex-1 rounded-lg bg-[#3F3D9E] hover:bg-[#3F3D9E]/90 text-white"
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
              ? "bg-[#3F3D9E] text-white border-[#3F3D9E] hover:bg-[#3F3D9E]/90 hover:text-white"
              : "text-[#3F3D9E] hover:bg-[#3F3D9E]/10 border-gray-200"
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

