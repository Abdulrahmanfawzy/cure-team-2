import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DoctorsType } from "../../types/sort.type";

type DoctorMarkerProps = {
  doctor: DoctorsType;
  isSelected?: boolean;
  onSelect?: () => void;
};

const createDoctorIcon = (image: string, isSelected?: boolean) => {
  return L.divIcon({
    className: "doctor-marker-wrapper",
    html: `
      <div class="doctor-marker ${isSelected ? "selected" : ""}">
        <img
          src="${image}"
          alt="doctor"
          onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'"
        />
      </div>
    `,
    iconSize: isSelected ? [52, 52] : [44, 44],
    iconAnchor: isSelected ? [26, 52] : [22, 44],
    popupAnchor: [0, isSelected ? -50 : -44],
  });
};

export default function DoctorMarker({
  doctor,
  isSelected = false,
  onSelect,
}: DoctorMarkerProps) {
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[doctor.latitude, doctor.longitude]}
      icon={createDoctorIcon(doctor.profile_image, isSelected)}
      zIndexOffset={isSelected ? 1000 : 1}
      eventHandlers={{
        click: () => {
          onSelect?.();
        },
      }}
    >
      <Popup className="custom-doctor-popup">
        <div className="w-56 p-1 text-gray-800">
          <div className="flex items-center gap-2.5">
            <img
              src={doctor.profile_image}
              alt={doctor.name}
              className="size-11 rounded-full object-cover border border-gray-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm leading-tight text-gray-900 truncate">
                {doctor.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {doctor.specialist?.name}
              </p>
              <p className="text-[11px] text-gray-400 truncate">
                {doctor.hospital}
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-gray-600 border-t pt-2">
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              {doctor.rating_count}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <Clock className="size-3" />
              {doctor.opening_hours}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">Price/hour</span>
            <span className="font-bold text-red-500">
              ${doctor.consultation_price}
            </span>
          </div>

          <Button
            size="sm"
            className="mt-2.5 w-full rounded-lg bg-[#3F3D9E] text-white hover:bg-[#3F3D9E]/90 text-xs py-1.5 h-7 font-medium"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Book appointment
          </Button>
        </div>
      </Popup>
    </Marker>
  );
}
