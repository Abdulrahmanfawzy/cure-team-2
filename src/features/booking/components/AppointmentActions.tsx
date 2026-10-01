import { useState } from "react";
import type { AppointmentFilter } from "../types/appointment.types";
import CancelAppointmentDialog from "./CancelAppointmentDialog";

import { Link } from "react-router-dom";
import type { Doctor } from "../types/booking.types";
import SupportDialog from "./SupportDialog";
import AddReviewModal from "@/features/appointment/component/Appointment/AddReviewModal";


interface IProps {
  bookingId: string;
  status: AppointmentFilter;
  doctor: Doctor;

}

const AppointmentActions = ({ bookingId, status, doctor }: IProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReschdualeOpen, setIsRescheduleOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const buttonClass =
    "h-10 flex-1 rounded-action border text-sm font-montserrat";

  if (status === "Upcoming") {
    return (
      <>
        <div className="my-2 flex gap-3.5">
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className={`${buttonClass} border-action-muted text-action-muted`}
          >
            Cancel
          </button>

          <button
            className={`${buttonClass} border-app-main bg-app-main text-white`}
          >
            Reschedule
          </button>
        </div>
        <CancelAppointmentDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          bookingId={bookingId}
        />
      </>

    );
  }

  if (status === "Completed") {
    return (
      <div className="mt-2 flex gap-2">
        <Link
          to={`/appointment/${doctor.doctor_id}`}

          className={`${buttonClass} border-app-main text-app-main flex items-center justify-center `}
        >
          Book again
        </Link>

        <button
          type="button"
        onClick={() => setIsFeedbackOpen(true)}
          className={`${buttonClass} border-app-main bg-app-main text-white`}
        >
          Feedback
        </button>

        <AddReviewModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 flex gap-2">
        <Link
          to={`/appointment/${doctor.doctor_id}`}

          className={`${buttonClass} border-app-main text-app-main flex items-center justify-center `}
        >
          Book again
        </Link>

        <button
          type="button"

          onClick={() => setIsDialogOpen(true)}
          className={`${buttonClass} border-app-support bg-app-support text-white`}
        >
          Support
        </button>
      </div>

      {/* dialog support */}
      <SupportDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        bookingId={bookingId}
      />
     
    </>
  );

}

export default AppointmentActions