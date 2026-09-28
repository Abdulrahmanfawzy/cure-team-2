

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
import useGetDoctorDetails from "../hooks/useGetDoctorDetails"
import { useParams } from "react-router-dom"
import Reviews from "../component/Appointment/Reviews"


const AppointmentPage = () => {

    const { id } = useParams<{ id: string }>();
    const { data: doctor, isLoading, isError } = useGetDoctorDetails(id!);

    if (!id) {
        return <div>Missing doctor id</div>
    }

    if (isLoading) {
        return <div>..Loooooding</div>
    }

    if (isError || !doctor?.data) {
        return  
            <p>Something went wrong</p>
            
        
    }

    return (
        <main className="font-montserrat mx-auto mt-8 sm:mt-27 mb-18 flex w-full max-w-7xl flex-col gap-6 px-4 font-[Georgia] sm:px-6 lg:flex-row lg:items-start lg:px-8">
            {/* -----select appointment Desktop----- */}
            <div className="hidden sm:block w-full max-w-196 lg:flex-1">
                <AppointmentHeader />
                <AppointmentPicker />
                <AppointmentRating rating={doctor.data.rating_avg} totalReview={doctor.data.reviews_count} />
                <Reviews  reviews={doctor.data.reviews} />
              
            </div>
            
            {/*---------- doc info mobile----------- */}
            <div className="sm:hidden flex flex-col gap-3">
                <HeaderMobile />
                <DoctorDetailsMobile
                    profile_image={doctor.data.profile_image}
                    name={doctor.data.name }
                    specialist={doctor.data.specialist.name}
                    is_favorite={doctor.data.is_favorite } />
            </div>

            {/* picker for appointment in mob */}
            <AppointmentPickerMob availableSlots={doctor.data.available_slots} consultation_price={doctor.data.consultation_price} />
            {/*----------- doc info desktop----------- */}
            <div className="hidden sm:block w-full max-w-115 rounded-4xl bg-background-neutral-lightest px-4 pb-6 pt-8 lg:shrink-0">
                <DoctorHeader
                    name={doctor.data.name}
                    profile_image={doctor.data.profile_image}
                    specialist={doctor.data.specialist.name}
                    is_favorite={doctor.data.is_favorite}

                />
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