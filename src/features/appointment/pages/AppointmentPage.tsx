
import AppointmentHeader from "../component/Appointment/AppointmentHeader"
import AppointmentPicker from "../component/Appointment/AppointmentPicker"
import AppointmentRating from "../component/Appointment/AppointmentRating"
import Testimonial from "../component/Appointment/Testimonial"
import DoctorHeader from "../component/DoctorProfile/DoctorHeader"

const AppointmentPage = () => {
    return (
        <main className="font-[Georgia] mt-27 mx-15 flex gap-6">
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
            {/*----------- doc info----------- */}
            <div className="w-full max-w-115 rounded-4xl pt-8 px-4 pb-6 bg-[#F5F6F7] ">
                <DoctorHeader />
            </div>



        </main>
    )
}

export default AppointmentPage