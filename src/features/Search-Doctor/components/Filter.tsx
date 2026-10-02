import Tunning from "@/assets/Tuning.svg";
import CaretDown from "@/assets/Vector.svg";
import { Button } from "@/components/ui/button";

type SplitFilterButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function SplitFilterButton({
  isOpen,
  onToggle,
}: SplitFilterButtonProps) {
  return (
    <div className="flex w-fit shrink-0 items-center rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden h-10 sm:h-11">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-none bg-transparent px-2.5 sm:px-4 h-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <img src={Tunning} alt="tunning" className="size-4 shrink-0" />
        <span className="hidden xs:inline">Filter</span>
      </Button>

      <div className="my-1.5 h-4 w-px bg-gray-300" />

      <Button
        type="button"
        variant="ghost"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Filter Options"
        className="flex items-center justify-center rounded-none bg-transparent px-2 sm:px-2.5 h-full text-gray-600 hover:bg-gray-50"
      >
        <img
          src={CaretDown}
          alt="caretdown"
          className={`size-3 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>
    </div>
  );
}
