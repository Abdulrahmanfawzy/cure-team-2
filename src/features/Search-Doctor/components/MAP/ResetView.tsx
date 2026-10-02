import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { useMap } from "react-leaflet";
import type { DoctorsType } from "../../types/sort.type";

export default function ResetViewButton({ doctors }: { doctors: DoctorsType[] }) {
  const map = useMap();
const CAIRO_CENTER: [number, number] = [30.0444, 31.2357];

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (doctors.length > 0) {
      const bounds = doctors.map((d) => [d.latitude, d.longitude] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else {
      map.setView(CAIRO_CENTER, 13);
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      onClick={handleReset}
      className="absolute top-4 left-4 z-1000 flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md backdrop-blur-sm hover:bg-white border border-gray-100"
    >
      <Navigation className="size-3.5 text-primary" />
      <span>Center All</span>
    </Button>
  );
}