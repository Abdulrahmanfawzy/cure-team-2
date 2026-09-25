import { useState } from "react";
import AppointmentTabs from "../components/AppointmentTabs"
import type { AppointmentTab } from "../types/appointment.types";
import AppointmentDateFilter from "../components/AppointmentDateFilter";

interface IProps {



}

const BookingPage = ({ }: IProps) => {
    const [activeTab, setActiveTab] = useState<AppointmentTab>("all");
      const [selectedDate, setSelectedDate] = useState("Monday, July 21");
  return (
    <main className="mt-9 min-h-screen  p-6">
      <div className="mx-auto max-w-250">
        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <div className=" flex flex-col justify-end gap-7">
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

      </div>


    </main >
  )
}
export default BookingPage