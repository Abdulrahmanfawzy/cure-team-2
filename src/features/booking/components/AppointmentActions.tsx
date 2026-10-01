import { useState } from "react";
import type { AppointmentFilter } from "../types/appointment.types";
import CancelAppointmentDialog from "./CancelAppointmentDialog";

interface IProps {
bookingId:string;
 status: AppointmentFilter;

}

const AppointmentActions=({bookingId,status}:IProps)=> {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  
    const buttonClass =
    "h-10 flex-1 rounded-action border text-sm font-montserrat";

  if (status === "Upcoming") {
    return (
      <>
      <div className="my-2 flex gap-3.5">
        <button
          type="button"
          onClick={() => setIsCancelDialogOpen(true)}
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
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        bookingId={bookingId}
      />
      </>
      
    );
  }

  if (status === "Completed") {
    return (
      <div className="mt-2 flex gap-2">
        <button
          className={`${buttonClass} border-app-main text-app-main`}
        >
          Book again
        </button>

        <button
          className={`${buttonClass} border-app-main bg-app-main text-white`}
        >
          Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2 flex gap-2">
      <button
        className={`${buttonClass} border-app-main text-app-main`}
      >
        Book again
      </button>

      <button
        className={`${buttonClass} border-app-support bg-app-support text-white`}
      >
        Support
      </button>
    </div>
  );
  
}

export default AppointmentActions