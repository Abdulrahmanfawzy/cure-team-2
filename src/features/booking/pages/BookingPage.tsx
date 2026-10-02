import { useEffect, useMemo, useState } from "react";
import AppointmentTabs from "../components/AppointmentTabs";
import AppointmentDateFilter from "../components/AppointmentDateFilter";
import AppointmentCard from "../components/AppointmentCard";
import BookingCardsSkeleton from "../components/BookingCardsSkeleton";
import useGetDocBooking from "../hooks/useGetDocBooking";
import type { AppointmentStatus, AppointmentTab } from "../types/appointment.types";

const statusesForTab = (tab: AppointmentTab): AppointmentStatus[] | undefined => {
  if (tab === "upcoming") return ["pending", "confirmed", "rescheduled"];
  if (tab === "completed") return ["completed"];
  if (tab === "canceled") return ["cancelled", "rejected", "expired"];
  return undefined;
};

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState<AppointmentTab>("all");
  const [selectedDate, setSelectedDate] = useState("");

  const statuses = statusesForTab(activeTab);
  const {
    data: availableBookings,
    isFetching: isAvailabilityFetching,
    isError: isAvailabilityError,
  } = useGetDocBooking({ statuses });
  const {
    data: booking,
    isFetching,
    isError,
  } = useGetDocBooking({
    statuses,
    date: selectedDate && selectedDate !== "all" ? selectedDate : undefined,
  });

  const availableDates = useMemo(() => {
    const dates = availableBookings?.data.map((appointment) => appointment.date) ?? [];
    return [...new Set(dates)];
  }, [availableBookings]);

  useEffect(() => {
    if (!availableBookings?.data) return;

    const validDates = availableDates;

    if (!validDates.length) {
      setSelectedDate("all");
      return;
    }

    if (!selectedDate) {
      setSelectedDate('validDates[0]');
      return;
    }

    if (selectedDate !== "all" && !validDates.includes(selectedDate)) {
      setSelectedDate(validDates[0]);
    }
  }, [activeTab, availableBookings, availableDates, selectedDate]);

  const filteredAppointments = booking?.data ?? [];

  const showSkeleton = isLoading || isAvailabilityLoading;
  const gridClass = "mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3";

  if (isError || isAvailabilityError) return <div>error</div>;

  return (
    <main className="container-main mt-9 min-h-screen p-4 sm:p-6">
      <div>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col justify-end gap-5 sm:gap-7">
            <h1 className="font-Georgia text-2xl font-medium leading-[100%] text-app-secondary">
              Your appointments
            </h1>

            <AppointmentTabs activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <AppointmentDateFilter
            value={selectedDate}
            activeOptions={availableDates}
            onChange={setSelectedDate}
          />
        </div>

        {showSkeleton ? (
          <BookingCardsSkeleton className={gridClass} />
        ) : (
          <div className={gridClass}>
            {filteredAppointments.map((card) => (
              <AppointmentCard
                key={card.id}
                id={card.id}
                date={card.date}
                doctorInfo={card.doctor}
                time={card.time}
                status={card.status}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingPage