import { Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type BtnMapProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function BtnMap({ isOpen, onToggle }: BtnMapProps) {
  return (
    <div className="flex w-fit shrink-0 items-center">
      <Button
        type="button"
        variant="outline"
        onClick={onToggle}
        aria-pressed={isOpen}
        aria-label={isOpen ? "Hide doctors map" : "Show doctors map"}
        className={`flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl px-2.5 sm:px-4 h-10 sm:h-11 text-xs sm:text-sm font-medium transition-all shadow-sm ${
          isOpen
            ? "border-primary bg-primary text-white hover:bg-primary/90 hover:text-white"
            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <MapIcon
          className={`size-4 transition-transform duration-200 ${
            isOpen ? "scale-110 text-white" : "text-primary"
          }`}
        />
        <span className="hidden xs:inline">{isOpen ? "Hide Map" : "Map"}</span>
        {isOpen && (
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
        )}
      </Button>
    </div>
  );
}

