import { CalendarDays, MapPin } from "lucide-react"
import AppointmentActions from "./AppointmentActions";
import type {  Doctor } from "../types/booking.types";
import { getImageUrl } from "@/utils/getImageUrl";
import { format, parse } from "date-fns";
import type { AppointmentStatus } from "../types/appointment.types";
import { mapAppointmentStatus } from "@/utils/mapAppointmentStatus";

interface IProps {
  id:string;
  date:string;
  doctorInfo:Doctor;
  time:string;
  status:AppointmentStatus;

}

const AppointmentCard = ({ id,date,doctorInfo,time,status }: IProps) => {
  const dayName = format(new Date(date), "EEEE");
  const Datee = format(new Date(date), "MMMM d");
  const Time =format(parse(time, "HH:mm:ss", new Date()), "h:mm a");

  const displayStatus = mapAppointmentStatus(status);
  
  return (
    <div className="w-full sm:max-w-99 rounded-card border border-neutral-lighter bg-white p-3 pb-4">
      {/* Appointment Date */}
      <div className="w-full flex items-center justify-between text-[9px] border-b border-b-neutral-lighter ">
        {/* date & state */}
        <div className="w-full flex items-center justify-between gap-3 mb-2  ">
          <div className="flex items-center gap-2 ">
            <CalendarDays size={16} className={displayStatus === "Upcoming" ? "text-app-secondary" : "text-gray-500"} />

            <span className={`text-xs ${displayStatus === "Upcoming" ? "text-app-secondary" : "text-content-muted"}`}>{dayName} ,{Datee } - {Time}</span>
          </div>
          <p className={`text-sm ${displayStatus === "Upcoming"? "text-app-main" : displayStatus === "Completed" ? "text-app-success" : "text-app-error"}`} >
            {status}
          </p>
        </div>
      

      </div>

      {/* Doctor */}
      <div className="my-4 flex items-center gap-2">
        <img
          src={getImageUrl(doctorInfo.doctor_image)}
          alt={doctorInfo.doctor_name}
          className="h-10.25 w-10.75 rounded-full object-cover"
        />

        <div>
          <p className="font-Georgia text-base text-doctor-name">
            {doctorInfo.doctor_name}
          </p>

          <p className="text-sm text-content-muted">
            {doctorInfo.specialist}
          </p>
        </div>
      </div>

    

      {/* Actions */}
      <AppointmentActions status={displayStatus}  bookingId={id} />

    </div>
  )
}

export default AppointmentCard
