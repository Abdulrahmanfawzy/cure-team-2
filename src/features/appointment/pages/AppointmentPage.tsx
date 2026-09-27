

import AppointmentHeader from "../component/Appointment/AppointmentHeader"
import AppointmentPicker from "../component/Appointment/AppointmentPicker"
import AppointmentRating from "../component/Appointment/AppointmentRating"
import Testimonial from "../component/Appointment/Testimonial"
import DoctorAbout from "../component/DoctorProfile/DoctorAbout"
import DoctorHeader from "../component/DoctorProfile/DoctorHeader"
import DoctorLocation from "../component/DoctorProfile/DoctorLocation"
import DoctorStats from "../component/DoctorProfile/DoctorStats"
import HeaderMobile from "../component/Appointment/HeaderMobile"
import DoctorDetailsMobile from "../component/Appointment/DoctorDetailsMobile"
import docImg from "../../../assets/women.jpg"
import AppointmentPickerMob from "../component/Appointment/AppointmentPicker/AppointmentPickerMob"

const AppointmentPage = () => {
    return (
        <main className="font-montserrat mx-auto mt-8 sm:mt-27 mb-18 flex w-full max-w-7xl flex-col gap-6 px-4 font-[Georgia] sm:px-6 lg:flex-row lg:items-start lg:px-8">
            {/* -----select appointment Desktop----- */}
            <div className="hidden sm:block w-full max-w-196 lg:flex-1">
                <AppointmentHeader />
                <AppointmentPicker />
                <AppointmentRating />
                {/* <Testimonial /> */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                    <Testimonial />
                    <Testimonial />
                </div>
            </div>
            
            {/*---------- doc info mobile----------- */}
            <div className="sm:hidden flex flex-col gap-3">
               <HeaderMobile/>
               <DoctorDetailsMobile image={docImg} doctorName="Dr. Jessica Turner" doctorLocation="129,El-Nasr Street, Cairo " doctorSpecialist="Pulmonologist" />
            </div>

            {/* picker for appointment in mob */}
            <AppointmentPickerMob />
            {/*----------- doc info----------- */}
            <div className="hidden sm:block w-full max-w-115 rounded-4xl bg-neutral-lightest px-4 pb-6 pt-8 lg:shrink-0">
                <DoctorHeader />
                <DoctorStats />
                <DoctorAbout />
                <DoctorLocation 
                    address="129, El-Nasr Street, Cairo, Egypt"
                    latitude={30.0444}
                    longitude={31.2357} />
            </div>



        </main>
    )
}

export default AppointmentPage