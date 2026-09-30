
import { addDays, addWeeks, format, startOfWeek, subWeeks } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Footer from "./AppointmentPicker/Footer";
import TimeSlots from "./AppointmentPicker/TimeSlots";
import WeekDays from "./AppointmentPicker/weekDays";
import Header from "./AppointmentPicker/Header";
import type { AvailableSlotDate } from "../../types/docAppointment.types";


interface IProps {


    availableSlots: AvailableSlotDate[];  // contain (date & slots[])

    consultation_price: number;

}

const AppointmentPicker = ({ availableSlots }: IProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    // ---------------------------------------------------
    // to set first available date instead of date of today
    useEffect(() => {
        const firstAvailableSlot = availableSlots.find(
            (day) => day.slots.some((slot)=> !slot.is_booked)
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
    // ------------------get available days ---------------------------------


    const isDayAvailable = (date: Date) => {
        const dateString = format(date, "yyyy-MM-dd");

        return availableSlots.some(
            (day) => day.date === dateString && 
            day.slots.some((slot)=> !slot.is_booked)
               
        );
    };

    // -----------------------------------------------
    const selectedDay = useMemo(() => {
        const dateString = format(selectedDate, "yyyy-MM-dd");

        return availableSlots.find(
            (day) =>
                day.date === dateString 
                
        );
    }, [availableSlots, selectedDate]);
    // -----------------------------------------------
    const availableTimes = useMemo(() => {
        if (!selectedDay) return [];

        return selectedDay.slots.filter((slot)=> !slot.is_booked)
        .map((slot)=>slot.start_time)
    }, [selectedDay]);
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