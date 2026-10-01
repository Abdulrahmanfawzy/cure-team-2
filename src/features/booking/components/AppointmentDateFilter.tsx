import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IProps {
  value: string;
  activeOptions: string[];
  onChange: (value: string) => void;
}

const AppointmentDateFilter = ({ value, activeOptions, onChange }: IProps) => {
  const [open, setOpen] = useState(false);
  const bookedDates = activeOptions.map((date) => parseISO(date));
  const bookedDateKeys = new Set(bookedDates.map((date) => format(date, "yyyy-MM-dd")));
  const selectedDate = value && value !== "all" ? parseISO(value) : undefined;
  const firstAvailableDate = bookedDates[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-12 w-full items-center gap-3 rounded-xl border border-secondary-lightest bg-white px-4 py-2 text-left text-gray-600 sm:max-w-99"
        >
          <CalendarDays size={13} className="shrink-0 text-app-secondary" />
          <span className="flex-1 truncate text-sm font-medium text-app-secondary">
            {value === "all"
              ? "All dates"
              : selectedDate
                ? format(selectedDate, "EEEE, MMMM d")
                : "Choose date"}
          </span>
          <ChevronDown size={14} className="shrink-0 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-2">
        <button
          type="button"
          onClick={() => {
            onChange("all");
            setOpen(false);
          }}
          className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition hover:bg-muted ${
            value === "all" ? "text-app-main" : "text-app-secondary"
          }`}
        >
          All dates
        </button>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            const selectedDateKey = format(date, "yyyy-MM-dd");
            const matchingDate = activeOptions.find(
              (availableDate) => format(parseISO(availableDate), "yyyy-MM-dd") === selectedDateKey
            );
            if (!matchingDate) return;
            onChange(matchingDate);
            setOpen(false);
          }}
          month={selectedDate ?? firstAvailableDate}
          disabled={(date) => !bookedDateKeys.has(format(date, "yyyy-MM-dd"))}
          modifiers={{ hasBooking: bookedDates }}
          modifiersClassNames={{
            hasBooking: "font-semibold underline decoration-app-main decoration-2 underline-offset-4",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppointmentDateFilter