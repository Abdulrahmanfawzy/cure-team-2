import AppointmentHeader from "../component/Appointment/AppointmentHeader"
import AppointmentPicker from "../component/Appointment/AppointmentPicker"
import AppointmentRating from "../component/Appointment/AppointmentRating"
import Testimonial from "../component/Appointment/Testimonial"

const AppointmentPage = () => {
    return (
        <main className="font-[Georgia] mt-27 ml-25 ">
            {/* ---------- */}
            <div className="max-w-196">
                <AppointmentHeader />
                <AppointmentPicker />
                <AppointmentRating />
                {/* <Testimonial /> */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-13">
                    <Testimonial />
                    <Testimonial />
                </div>

                



            </div>

        </main>
    )
}

export default AppointmentPage