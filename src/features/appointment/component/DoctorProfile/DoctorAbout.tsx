interface IProps {



}

const DoctorAbout = ({ }: IProps) => {
    return (
        <div className="flex flex-col gap-2.25 mt-5 p-4">
            <h3 className="text-[20px] text-text-secondary-default">About me</h3>
            <p className="text-[14px] text-text-neutral-darkest">
                Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and
            </p>

        </div>
    )
}

export default DoctorAbout