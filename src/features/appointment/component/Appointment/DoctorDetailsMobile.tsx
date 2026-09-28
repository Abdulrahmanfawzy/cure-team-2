import { useState } from "react";
import { Check, Heart } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

interface IProps {
    profile_image: string;
    name: string;
    specialist: string;
    is_favorite:boolean;

}

const DoctorDetailsMobile = ({ profile_image, name, specialist,is_favorite }: IProps) => {
    const [isFavorite, setIsFavorite] = useState(is_favorite);

    return (
        <section className="flex items-center justify-between gap-3 mt-5 px-7">
            <div className=" flex items-center gap-4">
                <div className="relative">
                    <img src={getImageUrl(profile_image)}

                     className="w-30.25 h-25.25 rounded-[50%]  object-cover  " />
                    <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1677FF] text-white ring-2 ring-white">
                        <Check size={15} strokeWidth={3} />
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-[20px] text-text-secondary-default">{name}</p>
                    <p className="text-[14px] text-[#6D7379] ">{specialist}</p>
                    {/* <p className="text-[14px] text-[#6D7379] ">{location}</p> */}

                </div>
            </div>
            <button
                type="button"
                aria-label={isFavorite ? "Remove doctor from favorites" : "Add doctor to favorites"}
                aria-pressed={isFavorite}
                onClick={() => setIsFavorite((favorite) => !favorite)}
                className="cursor-pointer"
            >
                <Heart
                    className={isFavorite ? "fill-red-500 text-red-500" : "text-text-secondary-default"}
                />
            </button>
        </section>
    )
}

export default DoctorDetailsMobile