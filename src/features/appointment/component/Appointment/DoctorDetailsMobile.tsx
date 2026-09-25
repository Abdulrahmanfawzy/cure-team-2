import { useState } from "react";
import { Check, Heart } from "lucide-react";

interface IProps {
    image: string;
    doctorName: string;
    doctorSpecialist: string;
    doctorLocation: string;

}

const DoctorDetailsMobile = ({ image, doctorName, doctorLocation, doctorSpecialist }: IProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <section className="flex items-center justify-between gap-3 mt-5 px-7">
            <div className=" flex items-center gap-4">
            <div className="relative">
                <img src={image} className="w-28.25 h-28.25 rounded-[50%] " />
                <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1677FF] text-white ring-2 ring-white">
                    <Check size={15} strokeWidth={3} />
                </span>
            </div>
            
                <div className="flex flex-col gap-2">
                    <p className="text-[20px] text-app-secondary">{doctorName}</p>
                    <p className="text-[14px] text-[#6D7379] ">{doctorSpecialist}</p>
                    <p className="text-[14px] text-[#6D7379] ">{doctorLocation}</p>

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
                    className={isFavorite ? "fill-red-500 text-red-500" : "text-app-secondary"}
                />
            </button>
        </section>
    )
}

export default DoctorDetailsMobile