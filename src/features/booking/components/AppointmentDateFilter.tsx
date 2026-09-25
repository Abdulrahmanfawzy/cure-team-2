import { CalendarDays, ChevronDown } from "lucide-react";

interface IProps {

 value: string;
  onChange: (value: string) => void;

}

const AppointmentDateFilter=({value}:IProps)=> {
  return (
    <button
      type="button"
      className="flex w-full h-12 max-w-99 px-4 py-2 items-center justify-between rounded-[12px] border border-secondary-lightest bg-white  text-xs text-gray-600"
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