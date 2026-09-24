import { Button } from "@/components/ui/button";

interface IProps {
availableTimes:string[];
selectedTime:string | null;
setSelectedTime:(time: string) => void;

}

const TimeSlots=({availableTimes,selectedTime,setSelectedTime}:IProps)=> {
  return (
    <div className="mt-3 grid grid-cols-4 gap-2">
                {
                    availableTimes.length > 0 ? (
                        availableTimes.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                                <Button

                                    onClick={() => setSelectedTime(time)}
                                    className={` flex h-12 w-26.25 p-2! flex-col items-center justify-center rounded-[10px] text-[14px] font-medium transition
                                            ${isSelected ? "bg-background-primary-default text-white  "
                                            : "bg-background-neutral-lightest text-[#6D7379] hover:bg-[#E5E7EB]"}`}
                                >
                                    {time}

                                </Button>
                            );
                        })
                    ) : (
                        <p className="col-span-4 py-3 text-center text-[11px] text-[#9CA3AF]">
                            No available appointments
                        </p>
                    )
                }
            </div>
  )
}

export default TimeSlots