import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"

interface IProps {
    selectedTime: string | null;
    selectedDate: Date;
    onBook?: () => void;


}

const Footer = ({ selectedTime, selectedDate, onBook }: IProps) => {
    return (
        <div className="mt-8 flex items-center justify-between">
            {/* --------------selected date----------------- */}
            <div className="flex items-center ! gap-1.5 text-[10px] text-[#374151]">

                <CalendarDays

                    className="text-[#145DB8] w-[15.83px] h-[16.66px] "
                />

                {selectedTime ? (
                    <p className="text-app-secondary text-[14px] font-medium">
                        {format(selectedDate, "EEEE, MMMM d")} · {selectedTime}
                    </p>
                ) : (
                    <p className="text-app-secondary text-[14px] font-medium">
                        {format(selectedDate, "EEEE, MMMM d")} · Select time
                    </p>
                )}


            </div>
            <Button
                variant={'outline'} disabled={!selectedTime} onClick={onBook}
                className="h-12 w-30.75 border border-[#145DB8] p-2 text-[16px] text-[#145DB8] hover:bg-[#1261A0]
                       hover:text-white disabled:cursor-not-allowed disabled:opacity-50"> 
                Book
            </Button>
        </div>
    )
}

export default Footer