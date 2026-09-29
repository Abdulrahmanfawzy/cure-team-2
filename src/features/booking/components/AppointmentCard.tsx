import { CalendarDays, MapPin } from "lucide-react"
import docImg from "../../../assets/women.jpg"
import AppointmentActions from "./AppointmentActions";
import type { AppointmentStatus } from "../types/appointment.types";

interface IProps {

  status: AppointmentStatus;

}

const AppointmentCard = ({ status }: IProps) => {
  return (
    <div className="w-full sm:max-w-99 rounded-card border border-neutral-lighter bg-white p-3 pb-4">
      {/* Appointment Date */}
      <div className="w-full flex items-center justify-between text-[9px] border-b border-b-neutral-lighter ">
        {/* date & state */}
        <div className="w-full flex items-center justify-between gap-3 mb-2  ">
          <div className="flex items-center gap-2 ">
            <CalendarDays size={16} className={status === 'Upcoming' ? "text-app-secondary" : "text-gray-500"} />

            <span className={`text-xs ${status === 'Upcoming' ? "text-app-secondary" : "text-content-muted"}`}>Monday, July 21 - 11:00 AM</span>
          </div>
          <p className={`text-sm ${status === "Upcoming" ? "text-app-main" : status === "Completed" ? "text-app-success" : "text-app-error"}`} >
            {status}
          </p>
        </div>
      

      </div>

      {/* Doctor */}
      <div className="mt-2 flex items-center gap-2">
        <img
          src={docImg}
          alt="Jennifer Miller"
          className="h-10.25 w-10.75 rounded-full object-cover"
        />

        <div>
          <p className="font-Georgia text-base text-doctor-name">
            Jennifer Miller
          </p>

          <p className="text-sm text-content-muted">
            Psychiatrist
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="mt-2 flex items-center gap-1 text-xs text-content-subtle">
        <MapPin size={20} />
        <span className="text-sm text-content-muted">129, El-Nasr Street, Cairo, Egypt</span>
      </div>

      {/* Actions */}
      <AppointmentActions status={status} />

    </div>
  )
}

export default AppointmentCard
