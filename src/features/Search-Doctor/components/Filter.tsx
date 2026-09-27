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
    <div className="flex w-fit shrink-0 items-center rounded-md border border-gray-300 bg-white shadow-sm">
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center justify-center gap-2.5 rounded-l-xl bg-transparent px-4 py-5 font-medium text-gray-700 hover:bg-gray-50"
      >
        <img src={Tunning} alt="tunning" />
        <span>Filter</span>
      </Button>

      <div className="my-1.5 w-px bg-gray-300" />

      <Button
        type="button"
        variant="default"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Filter Options"
        className="flex items-center justify-start bg-transparent py-5 text-gray-600 hover:bg-gray-50"
      >
        <img
          src={CaretDown}
          alt="caretdown"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </Button>
    </div>
  );
}
