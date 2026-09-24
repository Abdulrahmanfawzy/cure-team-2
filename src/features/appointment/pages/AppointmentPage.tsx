import AppointmentHeader from "../component/Appointment/AppointmentHeader"
import AppointmentPicker from "../component/Appointment/AppointmentPicker"
import AppointmentRating from "../component/Appointment/AppointmentRating"

const AppointmentPage=()=> {
  return (
     <main className="font-[Georgia] mt-27 ml-25">
      {/* ---------- */}
      <div className="max-w-196">
        <AppointmentHeader/>
        <AppointmentPicker />
        <AppointmentRating />
       

      
      </div>

    </main>
  )
}

export default AppointmentPage