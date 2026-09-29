import { Button } from "@/components/ui/button"
import { Pencil, Star } from "lucide-react"
import { useState } from "react";
import AddReviewModal from "./AddReviewModal";

interface IProps {
  rating: number;
  totalReview: number;



}

const AppointmentRating = ({ rating, totalReview }: IProps) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  return (
<<<<<<< HEAD
    
        
        <>
        <section className="flex items-center justify-between mt-4  font-montserrat">
          <p className="text-[20px] text-[#000000] ">Reviews and Rating</p>
          <div className="flex items-center ">
            <Button variant={'ghost'} className="cursor-pointer -mr-2">
                <Pencil className="w-[16.6px] h-[16.6px] text-[#145DB8]" />
            </Button>
=======


    <>
      <section className="flex items-center justify-between mt-4 ">
        <p className="text-[20px] text-[#000000] ">Reviews and Rating</p>
        <div className="flex items-center ">
          <Button variant={'ghost'} className="cursor-pointer -mr-2" onClick={() => setIsReviewOpen(true)}>
            <Pencil className="w-[16.6px] h-[16.6px] text-[#145DB8]" />
>>>>>>> 7b44d7d021526b9c602cbafffac06bfa91c5b8eb
            <p className="text-[14px] text-[#145DB8]">add review</p>
          </Button>

        </div>
      </section>

      <section className="flex items-center justify-between mt-4">
        <p className="text-[40px]  text-text-secondary-default">{rating}/5</p>
        <div className="flex flex-col items-center gap-2">

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={index < Math.floor(rating) ? "h-5 w-5 text-[#F9E000]" : "h-5 w-5 text-[#F9E00059]"}
                fill="currentColor"
              />
            ))}


          </div>
          <p className="text-[16px] text-[#6D7379]">{totalReview}+ Reviews</p>
        </div>
      </section>

<<<<<<< HEAD
        <section className="flex items-center justify-between mt-4">
          <p className="text-[40px] text-app-secondary">4.5/5</p>
          <div className="flex flex-col items-center gap-2">

            <div className="flex items-center gap-1">
              {Array.from({length:5},(_,index)=>(
                <Star
                     key={index}
                     className={index < Math.floor(4.5) ? "h-5 w-5 text-[#F9E000]" : "h-5 w-5 text-[#F9E00059]"}
                    fill="currentColor"
                    />
              ))}


            </div>
            <p className="text-[16px] text-[#6D7379]">1250+ Reviews</p>
          </div>
        </section>
     
      </>
=======
      {/* Review Modal */}
      <AddReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />
    </>
>>>>>>> 7b44d7d021526b9c602cbafffac06bfa91c5b8eb


  )
}

export default AppointmentRating