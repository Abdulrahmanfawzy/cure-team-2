import { format } from "date-fns";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface IProps {



}

const AppointmentPickerMob = ({ }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  return (
    <div className="w-full  flex flex-col sm:hidden ">
      <p>Select Day</p>
      <button
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      className="border border-[#145DB8] rounded-[12px] p-4 flex items-center justify-between "
    >
      <div className="flex items-center gap-2">
        <CalendarDays size={17} className="text-[#99A2AB]" />
        <span className="text-[14px] text-[#05162C] font-medium font-[Montserrat] ">
          {format(selectedDate, "EEEE, MMMM d")}
        </span>
      </div>


      {isOpen ? <ChevronUp size={17} className="text-[#145DB8]" /> :<ChevronDown size={17} className="text-[#145DB8]" />}
      
    </button>

    {isOpen && (
      <div>calender</div>
    )}
    </div>

  )
}

export default AppointmentPickerMob