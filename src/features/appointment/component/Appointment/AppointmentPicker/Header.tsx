import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {  CalendarDays, ChevronDown, ChevronUp } from "lucide-react"
interface IProps {

 selectedDate: Date;
handleDateChange:(date: Date | undefined) => void;
isDayAvailable:  (date: Date) => boolean;

}

const Header=({selectedDate,handleDateChange,isDayAvailable}:IProps)=> {
  return (
        <header className="flex items-center justify-between border-b border-[#99A2AB] pb-3">
                <p className="text-[16px] font-[Montserrat] text-neutral-darkest">
                    Choose date and time
                </p>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'ghost'}>
                            <CalendarDays />
                            {format(selectedDate, "MMMM, yyyy")}
                            <div className="flex flex-col ">
                                <ChevronUp />
                                <ChevronDown />
                            </div>
                            {/* <div className="flex"></div> */}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">

                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateChange}
                            disabled={(date) => !isDayAvailable(date)}
                        />

                    </PopoverContent>
                </Popover>
            </header>
  )
}

export default Header