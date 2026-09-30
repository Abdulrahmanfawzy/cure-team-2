import type { Doctor, Slot } from "@/features/appointment/types/docAppointment.types";
import { getImageUrl } from "@/utils/getImageUrl";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface IProps {
  doctor: Doctor;
  selectedDate: Date;
  selectedSlot: Slot;
  onReschedule: () => void;
}

const PaymentDoctorInfo = ({
  doctor,
  selectedDate,
  selectedSlot,
  onReschedule,
}: IProps) => {
  return (
    <>
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={getImageUrl(doctor.profile_image)}
          alt={doctor.name}
          className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
        />

        <div>
          <h2 className="text-base font-medium text-[#111827] sm:text-[20px]">
            {doctor.name}
          </h2>

          <p className="mt-1 text-[12px] text-[#99A2AB] sm:text-[15px]">
            {doctor.specialist.name}
          </p>

          
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 sm:mt-8">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-app-main" />

          <p className="text-[12px] font-medium text-app-secondary font-montserrat sm:text-sm">
            {format(selectedDate, "EEEE, MMMM d")} - {selectedSlot.start_time}
          </p>
        </div>

        <button
          type="button"
          onClick={onReschedule}
          className="cursor-pointer text-[11px] text-app-main sm:text-[13px]"
        >
          Reschedule
        </button>
      </div>
    </>
  );
};

export default PaymentDoctorInfo;