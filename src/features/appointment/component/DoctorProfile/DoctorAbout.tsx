import { useState } from "react";

interface IProps {
    about: string;


}

const DoctorAbout = ({ about }: IProps) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="flex flex-col gap-2.25 mt-5 p-4">
            <h3 className="text-xl text-text-secondary-default">About me</h3>
            <p className={`text-sm text-text-neutral-darkest ${!showMore ? "line-clamp-2" : ""
                }`}>
                {about}
            </p>
            {about.length > 90 && (
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="w-fit text-sm text-background-primary-default"
                >
                    {showMore ? "Read less" : "Read more"}
                </button>
            )}

        </div>
    )
}

export default DoctorAbout