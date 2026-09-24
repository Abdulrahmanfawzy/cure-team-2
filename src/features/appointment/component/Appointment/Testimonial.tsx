import { Star } from "lucide-react"
import personImage from "../../../../assets/man.svg"

interface IProps {



}

const Testimonial=({}:IProps)=> {
  return (
    <div className="max-w-95.25 mt-6 border border-[#BBC1C7] rounded-3xl py-3 px-3.5 ">
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                            <img src={personImage} className="rounded-[50%] bg-[#d7d7e4]" />
                            <div>
                                <p className="text-[#05162C] text-[16px]">Ferry Ichsan A</p>
                                <p className="text-[#404448] text-[14px]">A week ago</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-[#F9E0001A] rounded-[6px] p-1.5 gap-1">
                            <Star fill="#F9E000" className="text-[#F9E000] w-5 h-5"/>
                            <p className="text-[16px] font-bold text-[#F9E000] "> 4.5</p>
                             </div>
                    </div>
                    <p className="text-[#555B6C] text-[16px] font-medium mt-1">Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!"</p>
                </div>
  )
}

export default Testimonial