import { useState } from "react";
import type { AppointmentFilter } from "../types/appointment.types";
import CancelAppointmentDialog from "./CancelAppointmentDialog";
import SupportDialog from "./SupportDialog";

interface IProps {
bookingId:string;
 status: AppointmentFilter;

}

const AppointmentActions=({bookingId,status}:IProps)=> {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
   <>
    <div className="mt-2 flex gap-2">
      <button
        className={`${buttonClass} border-app-main text-app-main`}
      >
        Book again
      </button>

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