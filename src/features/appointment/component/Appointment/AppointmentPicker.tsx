
import { addDays, addWeeks, startOfWeek, subWeeks } from "date-fns";
import { useMemo, useState } from "react";
import Footer from "./AppointmentPicker/Footer";
import TimeSlots from "./AppointmentPicker/TimeSlots";
import WeekDays from "./AppointmentPicker/weekDays";
import Header from "./AppointmentPicker/Header";

interface IProps {



}

const AppointmentPicker = ({ }: IProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const doctorAvailability: Partial<Record<number, string[]>> = {
        5: ["09:00 AM", "10:00 AM", "11:00 AM", "12:30 AM", "5:30 PM", "7:00 PM" , "9:00 PM", "11:00 PM"],
        6: ["02:00 PM", "03:00 PM"],
        0: ["10:00 AM", "11:00 AM", "12:00 AM", "1:00 AM"],
        1: ["10:00 AM", "11:00 AM"],
        2: ["10:00 AM", "11:00 AM"],
        3: ["10:00 AM", "11:00 AM"],
        4: ["10:00 AM", "11:00 AM"],
    };
    const weekStart = startOfWeek(selectedDate, {
        weekStartsOn: 5,
    })
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, index) =>
            addDays(weekStart, index));
    }, [weekStart]);
    const availableTimes = doctorAvailability[selectedDate.getDay()] || [];
    const isDayAvailable = (date: Date) => {
        return Boolean(doctorAvailability[date.getDay()]);
    };
    const handleDateChange = (date: Date | undefined) => {
        if (!date) return;

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
        <section className="w-full font-[Montserrat]! rounded-[19px] border border-[#BBC1C7] bg-white p-4 mt-4">

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
            <TimeSlots  availableTimes={availableTimes} selectedTime={selectedTime}  setSelectedTime={setSelectedTime} />
            {/* ----------footer------------ */}
            <Footer selectedDate={selectedDate} selectedTime={selectedTime}  />

        </section>
    )
}

export default AppointmentPicker