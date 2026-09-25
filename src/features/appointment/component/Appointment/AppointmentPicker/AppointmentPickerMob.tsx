import {
  eachDayOfInterval, endOfMonth, format, getDay, startOfMonth, addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import TimeSlots from "./TimeSlots";

interface IProps {



}

const AppointmentPickerMob = ({ }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calenderStart = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - getDay(monthStart)
  )
  const calendarEnd = new Date(
    monthEnd.getFullYear(),
    monthEnd.getMonth(),
    monthEnd.getDate() + (6 - getDay(monthEnd))
  );
  const days = eachDayOfInterval({
    start: calenderStart,
    end: calendarEnd,

  });
  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:30 AM",
    "4:00 PM",
    "5:30 PM",
    "7:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];
  return (
    <div className="w-full  flex flex-col sm:hidden font-montserrat ">
      <p className="mb-3">Select a Day</p>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="border border-[#145DB8] rounded-[12px] p-4 flex items-center justify-between "
      >
        <div className="flex items-center gap-2">
          <CalendarDays size={17} className="text-[#99A2AB]" />
          <span className="text-[14px] text-app-secondary font-medium">
            {format(selectedDate, "EEEE, MMMM d")}
          </span>
        </div>


        {isOpen ? <ChevronUp size={17} className="text-[#145DB8]" /> : <ChevronDown size={17} className="text-[#145DB8]" />}

      </button>



      {/* days */}
      {isOpen && (
        <div className="border border-[#00000029] bg-[#FFFFFF] mt-3 p-4 rounded-[24px] shadow-[0px_0px_6px_0px_#00000029]">
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handlePreviousMonth}
              >
                <ArrowLeft size={18} color="#000000" className="ml-2" />
              </button>

              <span>
                {format(currentMonth, "MMMM yyyy")}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
              >
                <ArrowRight size={18} color="#000000" className="mr-2" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-6 ">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-[#145DB8] font-medium "
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDate);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={` mx-auto w-9 h-9 flex items-center justify-center gap-4 mt-2 p-4 rounded-[14px] text-[14px] font-medium transition-colors
                   ${isSelected ? "bg-app-main text-white" : isCurrentMonth ? "text-app-secondary bg-neutral-lightest" : "text-[#C7CDD3]"} `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* slots */}
      <div className=" bg-[#FFFFFF] mt-5  mb-12 ">
        <p className="mb-3">Select time</p>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`h-10 rounded-xl text-[11px] font-medium transition-colors
            ${isSelected
                    ? "bg-app-main text-white"
                    : "bg-neutral-lightest text-[#99A2AB] hover:bg-[#E9F1FB]"
                  }
          `}
              >
                {time}
              </button>
            );
          })}
        </div>



      </div>
      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 border-t z-50">

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className=" text-[24px] font-medium">
              Price
            </span>

            <span className="text-[10px] text-[#99A2AB] ml-1">
              /hour
            </span>
          </div>

          <span className="  text-[14px] font-medium text-[#FF5A5F]">
            350$
          </span>
        </div>

        <button
          type="button"
          disabled={!selectedTime}
          className="w-full h-10 rounded-[6px] bg-app-main text-white text-[12px]"
        >
          Continue to Pay
        </button>

      </div>



    </div>

  )
}

export default AppointmentPickerMob