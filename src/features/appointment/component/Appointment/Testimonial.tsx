import { Star } from "lucide-react"
import type { Review } from "../../types/docAppointment.types";


interface IProps {
    review: Review;


}

const Testimonial = ({ review }: IProps) => {
    return (

        <div className="max-w-95.25 min-h-43.75 mt-6 border border-[#BBC1C7] rounded-3xl py-3 px-3.5 ">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <img src={review.patient.profile_image} className="rounded-[50%] bg-[#d7d7e4] w-15.5 h-15.5 " />
                    <div>
                        <p className="text-text-secondary-default text-[16px]">{review.patient.name}</p>
                        <p className="text-text-neutral-darkest text-[14px]">{review.created_at_human}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-[#F9E0001A] rounded-[6px] p-1.5 gap-1">
                    <Star fill="#F9E000" className="text-[#F9E000] w-5 h-5" />
                    <p className="text-[16px] font-bold text-[#F9E000] "> {review.rating}</p>
                </div>
            </div>
            <p className="text-[#555B6C] text-[16px] font-medium mt-1"> {review.comment}</p>
        </div>
    )
}

export default Testimonial