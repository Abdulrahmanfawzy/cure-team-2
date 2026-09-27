import { useMemo, useState } from "react";
import AppointmentTabs from "../components/AppointmentTabs"
import type { Appointment, AppointmentTab } from "../types/appointment.types";
import AppointmentDateFilter from "../components/AppointmentDateFilter";
import AppointmentCard from "../components/AppointmentCard";

interface IProps {



}

const BookingPage = ({ }: IProps) => {
  const [activeTab, setActiveTab] = useState<AppointmentTab>("all");
  const [selectedDate, setSelectedDate] = useState("Monday, July 21");
  //       const mockAppointments: Appointment[] = [
  //   {
  //     id: "1",
  //     date: "Monday, July 21",
  //     time: "11:00 AM",
  //     patientName: "Jennifer Miller",
  //     doctorName: "Jennifer Miller",
  //     doctorSpecialty: "Psychiatrist",
  //     doctorImage: "/images/doctor.jpg",
  //     location: "129, El-Nasr Street, Cairo, Egypt",
  //     status: "upcoming",
  //   },
  //   {
  //     id: "2",
  //     date: "Monday, July 21",
  //     time: "11:00 AM",
  //     patientName: "Jennifer Miller",
  //     doctorName: "Jennifer Miller",
  //     doctorSpecialty: "Psychiatrist",
  //     doctorImage: "/images/doctor.jpg",
  //     location: "129, El-Nasr Street, Cairo, Egypt",
  //     status: "completed",
  //   },
  //   {
  //     id: "3",
  //     date: "Monday, July 21",
  //     time: "11:00 AM",
  //     patientName: "Jennifer Miller",
  //     doctorName: "Jennifer Miller",
  //     doctorSpecialty: "Psychiatrist",
  //     doctorImage: "/images/doctor.jpg",
  //     location: "129, El-Nasr Street, Cairo, Egypt",
  //     status: "cancelled",
  //   },
  // ];



  return (
    <main className="mt-9 min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-250">
        {/* header */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col justify-end gap-5 sm:gap-7">
            <h1 className="font-Georgia  text-2xl leading-[100%] font-medium text-app-secondary">
              Your appointments
            </h1>

            <AppointmentTabs
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
 
          
          <AppointmentDateFilter
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 ">
          <AppointmentCard status="Upcoming" />

          <AppointmentCard status="Completed" />

          <AppointmentCard status="Cancelled" />

          <AppointmentCard status="Completed" />
        </div>

      </div>


    </main >
  )
}
export default BookingPage