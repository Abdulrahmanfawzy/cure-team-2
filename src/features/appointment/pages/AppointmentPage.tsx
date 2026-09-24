import AppointmentHeader from "../component/Appointment/AppointmentHeader"
import AppointmentPicker from "../component/Appointment/AppointmentPicker"

const AppointmentPage=()=> {
  return (
     <main className="font-[Georgia] mt-27 ml-25">
      {/* ---------- */}
      <div className="max-w-196">
        <AppointmentHeader/>
        <AppointmentPicker />
       

      
      </div>

    </main>
  )
}

export default AppointmentPage