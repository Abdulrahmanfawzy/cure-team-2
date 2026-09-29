
import { addDays, addWeeks, format, startOfWeek, subWeeks } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Footer from "./AppointmentPicker/Footer";
import TimeSlots from "./AppointmentPicker/TimeSlots";
import WeekDays from "./AppointmentPicker/weekDays";
import Header from "./AppointmentPicker/Header";
import type { AvailableSlot } from "../../types/docAppointment.types";

interface IProps {

    availableSlots: AvailableSlot[];

    consultation_price: number;

}

const AppointmentPicker = ({ availableSlots }: IProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    // ---------------------------------------------------
    // to set first available date instead of date of today
    useEffect(() => {
        const firstAvailableSlot = availableSlots.find(
            (slot) => !slot.is_booked
        );

        if (firstAvailableSlot) {
            setSelectedDate(
                new Date(`${firstAvailableSlot.date}T00:00:00`)
            );
        }
    }, [availableSlots]);

    // ---------------------------------------------------
    const weekStart = startOfWeek(selectedDate, {
        weekStartsOn: 5,
    })
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, index) =>
            addDays(weekStart, index));
    }, [weekStart]);
    // ---------------------------------------------------


    const isDayAvailable = (date: Date) => {
        const dateString = format(date, "yyyy-MM-dd");

        return availableSlots.some(
            (slot) =>
                slot.date === dateString &&
                !slot.is_booked
        );
    };

    // -----------------------------------------------
    const selectedSlot = useMemo(() => {
        const dateString = format(selectedDate, "yyyy-MM-dd");

        return availableSlots.find(
            (slot) =>
                slot.date === dateString &&
                !slot.is_booked
        );
    }, [availableSlots, selectedDate]);
    // -----------------------------------------------
    const availableTimes = useMemo(() => {
        if (!selectedSlot) return [];

        return [selectedSlot.start_time];
    }, [selectedSlot]);
    // -----------------------------------------------

    const handleDateChange = (date: Date | undefined) => {
        if (!date) return;
        if (!isDayAvailable(date)) return;

        setSelectedDate(date);

        // Reset selected time
        setSelectedTime(null);
    };
    const nextWeek = () => {
        setSelectedDate((current) => addWeeks(current, 1));
        setSelectedTime(null);
    };
    const previousWeek = () => {
        setSelectedDate((current) => subWeeks(current, 1));
        setSelectedTime(null);
    };




    return (
        <section className="w-full font-montserrat rounded-[19px] border border-[#BBC1C7] bg-white p-4 mt-4">

            {/* ----------header---------- */}
            <Header selectedDate={selectedDate} handleDateChange={handleDateChange} isDayAvailable={isDayAvailable} />
            {/* ----------Days------------ */}
            <WeekDays
                selectedDate={selectedDate}
                isDayAvailable={isDayAvailable}
                weekDays={weekDays}
                previousWeek={previousWeek}
                nextWeek={nextWeek}
                handleDateChange={handleDateChange}
            />
            {/* ----------time slots------- */}
            <TimeSlots availableTimes={availableTimes} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            {/* ----------footer------------ */}
            <Footer selectedDate={selectedDate} selectedTime={selectedTime} />

        </section>
    )
}

export default AppointmentPicker