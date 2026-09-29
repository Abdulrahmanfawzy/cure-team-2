import { useState } from "react";
import { Star, X } from "lucide-react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddReviewModal = ({ isOpen, onClose }: IProps) => {
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 font-montserrat">
      <div className="relative w-111.25 rounded-4xl bg-white px-6 py-6 ">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer"
        >
          <X className="h-5 w-5 text-text-secondary-default" />
        </button>

        {/* Your Rate */}
        <p className="text-[16px] text-text-secondary-default">
          Your Rate
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, index) => {
              const starNumber = index + 1;

              return (
                <button
                  key={starNumber}
                  type="button"
                  onClick={() => setRating(starNumber)}
                  className="cursor-pointer"
                >
                  <Star
                    className={
                      starNumber <= rating
                        ? "h-7 w-7 text-[#F9E000]"
                        : "h-7 w-7 text-[#B8BEC6]"
                    }
                    fill="currentColor"
                  />
                </button>
              );
            })}
          </div>

          <p className="text-[40px] text-text-secondary-default">
            {rating}/5
          </p>
        </div>

        {/* Your Review */}
        <p className="mt-8 text-[20px] text-text-secondary-default">
          Your review
        </p>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          className="mt-5 h-63.5 w-full resize-none rounded-3xl border border-[#9AA5B1] p-4 outline-none placeholder:text-[#7D8792]"
        />

        {/* Send */}
        <button
          type="button"
          className="mt-7 h-11 w-full rounded-[10px] bg-background-primary-default text-white shadow-md cursor-pointer"
        >
          Send your review
        </button>
      </div>
    </div>
  );
};

export default AddReviewModal;