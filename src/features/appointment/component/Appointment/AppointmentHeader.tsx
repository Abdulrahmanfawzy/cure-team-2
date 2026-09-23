import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface IProps {



}

const AppointmentHeader = ({ }: IProps) => {
    return (
        <header className="flex items-center">

            <Button variant={"ghost"}>
                <ArrowLeft className="cursor-pointer" />
            </Button>
            <p className="text-[20px] text-[#05162C] ">Make an appointment</p>
        </header>
    )
}

export default AppointmentHeader