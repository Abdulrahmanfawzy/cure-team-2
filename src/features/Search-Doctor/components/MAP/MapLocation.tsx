import { MapPin } from "lucide-react";

type MapLocationProps = {
  locationText?: string;
};

export default function MapLocation({
  locationText = "129, El-Nasr Street, Cairo, Egypt",
}: MapLocationProps) {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] flex max-w-[85%] items-center gap-2 rounded-xl bg-white/95 backdrop-blur-sm px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-md border border-gray-100">
      <MapPin className="size-4 text-[#3F3D9E] shrink-0" />
      <span className="truncate">{locationText}</span>
    </div>
  );
}