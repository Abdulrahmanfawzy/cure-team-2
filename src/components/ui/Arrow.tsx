import CaretDown from '@/assets/caret-down.svg';
const Arrow =({className, onClick}: any) => {
    return(
        <button className="cursor-pointer" onClick={onClick}> 
            <img src={CaretDown} alt="caret-down" className={className} />
        </button>
    )
}
export default Arrow;