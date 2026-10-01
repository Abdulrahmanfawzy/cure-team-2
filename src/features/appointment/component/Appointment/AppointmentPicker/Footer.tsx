import { Button } from "@/components/ui/button"
import type { Slot } from "@/features/appointment/types/docAppointment.types";
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"

interface IProps {
    selectedSlot: Slot | null;
    selectedDate: Date;
    isPending:boolean;
    onBook?: () => void;


}


const Footer = ({ selectedSlot, selectedDate, isPending,onBook }: IProps) => {
    
    return (
        <div className="mt-8 flex items-center justify-between">
            {/* --------------selected date----------------- */}
            <div className="flex items-center ! gap-1.5 text-[10px] text-[#374151]">

                <CalendarDays

                    className="text-app-main w-[15.83px] h-[16.66px] "
                />

                {selectedSlot ? (
                    <p className="text-app-secondary text-[14px] font-medium">
                        {format(selectedDate, "EEEE, MMMM d")} · {selectedSlot.start_time}
                    </p>
                ) : (
                    <p className="text-app-secondary text-[14px] font-medium">
                        {format(selectedDate, "EEEE, MMMM d")} · Select time
                    </p>
                )}


            </div>
            <Button
                variant={'outline'} disabled={!selectedSlot || isPending} onClick={onBook}
                className="h-12 w-30.75 border border-app-main p-2 text-[16px] text-app-main hover:bg-[#1261A0]
                       hover:text-white disabled:cursor-not-allowed disabled:opacity-50"> 
                 {isPending ? "....booking" : "Book"}
            </Button>
        </div>
    )
}

export default Footer