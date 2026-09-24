import womanImage from "../../../../assets/women.jpg"
import { Heart, MessageCircleMore } from "lucide-react"
const DoctorHeader = () => {
    return (

        <div className="flex items-start justify-between gap-2">
            <button className="bg-white rounded-[50%] py-1.75 px-2 cursor-pointer"><Heart className="  w-6 h-6 " /></button>
            <div className="flex flex-col items-center">
                <img src={womanImage} className="w-28.25 h-28.25 rounded-[50%] " />
                <h3 className="text-[20px] text-text-secondary-default">Dr.Jessuca Turner</h3>
                <p className="text-[14px] text-text-neutral-darkest">Pulmonologist</p>
            </div>
            <button className="bg-white rounded-[50%] py-1.75 px-2 cursor-pointer"><MessageCircleMore className="  w-6 h-6 " /></button>

        </div>


    )
}

export default DoctorHeader