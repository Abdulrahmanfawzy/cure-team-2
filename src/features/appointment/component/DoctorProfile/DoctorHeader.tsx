import { getImageUrl } from "@/utils/getImageUrl";

import { Heart, MessageCircleMore } from "lucide-react"
interface Ipros{
    name:string;
    profile_image:string;
    specialist:string;
    is_favorite:boolean;
    onToggleFavorite: () => void;
}
const DoctorHeader = ({name,profile_image,specialist,is_favorite,onToggleFavorite}:Ipros) => {
    return (

        <div className="flex items-start justify-between gap-2">
            <button
               type="button"
               onClick={onToggleFavorite}
               aria-label={is_favorite ? "Remove doctor from favorites" : "Add doctor to favorites"}
               aria-pressed={is_favorite}
               className="bg-white rounded-[50%] py-1.75 px-2 cursor-pointer">
                <Heart className={`w-6 h-6 ${is_favorite ? "fill-red-500 text-red-500" : "text-app-secondary"}`} />
            </button>
            <div className="flex flex-col items-center">
                <img src={getImageUrl(profile_image)} className="w-28.25 h-28.25 rounded-[50%] object-cover " />
                <h3 className="text-xl text-text-secondary-default">{name}</h3>
                <p className="text-sm text-text-neutral-darkest">{specialist}</p>
            </div>
            <button className="bg-white rounded-[50%] py-1.75 px-2 cursor-pointer"><MessageCircleMore className="  w-6 h-6 " /></button>

        </div>


    )
}

export default DoctorHeader
