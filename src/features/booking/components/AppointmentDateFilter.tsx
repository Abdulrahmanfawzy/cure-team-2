import { CalendarDays, ChevronDown } from "lucide-react";

interface IProps {

 value: string;
  onChange: (value: string) => void;

}

const AppointmentDateFilter=({value}:IProps)=> {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-between rounded-xl border border-secondary-lightest bg-white px-4 py-2 text-xs text-gray-600 sm:max-w-99"
    >
      <div className="flex items-center gap-2">
        <CalendarDays size={13} />

        <span className="font-montserrat font-medium text-app-secondary text-sm ">{value}</span>
      </div>

      <ChevronDown size={14} />
    </button>
  )
}

export default AppointmentDateFilter