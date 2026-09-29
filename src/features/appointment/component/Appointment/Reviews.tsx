import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import type { Review } from "../../types/docAppointment.types";
import Testimonial from "./Testimonial";

interface ReviewsProps {
    reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
    const hasMoreThanTwo = reviews.length > 2;

    return (
        <Carousel
            opts={{
                align: "start",
                slidesToScroll: 2,
            }}
            className="w-full"
        >
            <CarouselContent>
                {reviews.map((review) => (
                    <CarouselItem
                        key={review.id}
                        className="basis-full sm:basis-1/2"
                    >
                        <Testimonial review={review} />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {hasMoreThanTwo && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
        </Carousel>
    );
};

export default Reviews;