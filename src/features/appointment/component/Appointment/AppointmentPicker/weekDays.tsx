import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProps {
selectedDate:Date;
isDayAvailable: (date: Date) => boolean;
weekDays:Date[] ;
previousWeek: () => void;
 nextWeek: () => void;
handleDateChange:(date: Date | undefined) => void;


}

const WeekDays=({selectedDate,isDayAvailable,weekDays,handleDateChange,previousWeek,nextWeek}:IProps)=> {
  return (
     <div className="flex items-center gap-2 mt-5">
                {/*-- -Previous week--- */}
                <Button onClick={previousWeek}  variant={"ghost"} className="cursor-pointer">
                    <ChevronLeft size={15} />
                </Button>

                {/* ---days--- */}
                <div className="grid flex-1 grid-cols-7 gap-2">
                    {weekDays.map((day) => {
                        const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                        const isAvailable = isDayAvailable(day);
                        return (
                            <Button
                                disabled={!isAvailable}
                                onClick={() => handleDateChange(day)}
                                className={` flex h-12 flex-col items-center justify-center rounded-[6px] text-[10px] transition
                         ${isSelected ? "bg-background-primary-default text-white w-12.5 h-15 " : isAvailable
                                        ? "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] w-12.5 h-15"
                                        : "cursor-not-allowed bg-white text-[#8f8f8f]"}
                        `}
                            >
                                <span className="text-[14px] font-medium  ">
                                    {format(day, "EEE")}
                                </span>
                                <span className="mt-0.5 text-[16px] font-medium ">
                                    {format(day, "dd")}
                                </span>

                            </Button>
                        );
                    })}
                </div>

                {/* ---next week---- */}
                <Button onClick={nextWeek} variant={"ghost"} className="cursor-pointer">
                    <ChevronRight size={15} />
                </Button>
            </div>
  )
}

export default WeekDays