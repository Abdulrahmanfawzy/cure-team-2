import { Button } from "@/components/ui/button";
import type { Slot } from "@/features/appointment/types/docAppointment.types";

interface IProps {
availableTimes:Slot[];
selectedSlot:Slot | null;
setSelectedSlot:(slot: Slot) => void;

}

const TimeSlots=({availableTimes,selectedSlot,setSelectedSlot}:IProps)=> {
    
  return (
    <div className="mt-3 grid grid-cols-4 gap-2">
                {
                    availableTimes.length > 0 ? (
                        availableTimes.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                                <Button
                                    key={slot.id}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={` flex h-12 w-26.25 p-2! flex-col items-center justify-center rounded-[10px] text-sm font-medium transition
                                            ${isSelected ? "bg-app-main text-white  "
                                            : "bg-neutral-lightest text-[#6D7379] hover:bg-[#E5E7EB]"}`}
                                >
                                    {slot.start_time}

                                </Button>
                            );
                        })
                    ) : (
                        <p className="col-span-4 py-3 text-center text-xs text-[#9CA3AF]">
                            No available appointments
                        </p>
                    )
                }
            </div>
  )
}

export default TimeSlots