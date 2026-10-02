import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import {  X } from "lucide-react";
import { cn } from "cn";

import type { DoctorsType } from "../../types/sort.type";
import DoctorMarker from "./DoctortMark";
import MapLocation from "./MapLocation";
import { Button } from "@/components/ui/button";
import ResetViewButton from "./ResetView";

const CAIRO_CENTER: [number, number] = [30.0444, 31.2357];

type DoctorsMapProps = {
  doctors?: any;
  doctorsList?: DoctorsType[];
  selectedDoctor?: DoctorsType | null;
  onSelectDoctor?: (doctor: DoctorsType) => void;
  onClose?: () => void;
  className?: string;
};

export default function DoctorsMap({
  doctors,
  doctorsList,
  selectedDoctor = null,
  onSelectDoctor,
  onClose,
  className,
}: DoctorsMapProps) {
  const list: DoctorsType[] = Array.isArray(doctors?.data)
    ? doctors.data
    : Array.isArray(doctors)
    ? doctors
    : Array.isArray(doctorsList)
    ? doctorsList
    : [];

  const initialCenter: [number, number] =
    selectedDoctor && selectedDoctor.latitude && selectedDoctor.longitude
      ? [selectedDoctor.latitude, selectedDoctor.longitude]
      : CAIRO_CENTER;
//Map Controller 
function MapController({
  selectedDoctor,
}: {
  selectedDoctor: DoctorsType | null;
}) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (doctors && doctors.latitude && doctors.longitude) {
      map.flyTo([doctors.latitude, doctors.longitude], 15, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [selectedDoctor, map]);

  return null;
}
  return (
    <div className={cn("relative h-full min-h-125 flex w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-gray-100", className)}>
      <MapContainer
        center={initialCenter}
        zoom={selectedDoctor ? 15 : 13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedDoctor={selectedDoctor} />
        <ResetViewButton doctors={list} />

        {list.map((doctor: DoctorsType) => (
          <DoctorMarker
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctor?.id === doctor.id}
            onSelect={() => onSelectDoctor?.(doctor)}
          />
        ))}
      </MapContainer>

      {/* Close Map Button */}
      {onClose && (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-1000 size-8 rounded-full bg-white/95 text-gray-600 shadow-md backdrop-blur-sm hover:bg-white hover:text-gray-900 border border-gray-100"
          title="Close map"
          aria-label="Close map"
        >
          <X className="size-4" />
        </Button>
      )}

      {/* Location Bar */}
      <MapLocation
        locationText={
          selectedDoctor
            ? `${selectedDoctor.name} • ${selectedDoctor.hospital}`
            : `${list.length} Doctors found in Cairo`
        }
      />
    </div>
  );
}
