import { getImageUrl } from "@/utils/getImageUrl";

import { Heart, MessageCircleMore } from "lucide-react"
import { useState } from "react";
import { useAddToFavourite } from "../../hooks/useAddToFavourite";
interface Ipros{
    doctor_id:string;
    name:string;
    profile_image:string;
    specialist:string;
    is_favorite:boolean;
}
const DoctorHeader = ({doctor_id,name,profile_image,specialist,is_favorite}:Ipros) => {
    const [isFavorite, setIsFavorite] = useState(is_favorite);
    const { mutate: addToFavourite, isPending } = useAddToFavourite(doctor_id);
    
    return (

        <div className="flex items-start justify-between gap-2">
            <button
                type="button"
                aria-label="Add doctor to favorites"
                aria-pressed={isFavorite}
                disabled={isFavorite || isPending}
                onClick={() => addToFavourite(undefined, { onSuccess: () => setIsFavorite(true) })}
                className="bg-white rounded-[50%] py-1.75 px-2 cursor-pointer disabled:cursor-default"
            >
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
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