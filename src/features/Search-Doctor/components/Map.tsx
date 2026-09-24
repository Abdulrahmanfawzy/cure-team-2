import { useState } from "react";
import Tunning from "@/assets/Tuning.svg";
import CaretDown from "@/assets/Vector.svg";
import { Button } from "@/components/ui/button";
import SidebarFilter from "./SidebarFilter";
export default function BtnMap() {
  const [isOpen, setIsOpen] = useState(false);
  const handelChange = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex w-fit items-center rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-indigo-500">
        <Button
          type="button"
          variant={"outline"}
          onClick={handelChange}
          className="flex items-center bg-transparent justify-center gap-2.5 px-4 py-5 text-gray-700 font-medium hover:bg-gray-50 rounded-l-xl transition-colors focus:outline-none"
        >
          <img src={Tunning} alt="tunning" />
          <span>Filter</span>
        </Button>
        <div className="w-px bg-gray-300 my-1.5" />
        <Button
          type="button"
          variant={"default"}
          onClick={handelChange}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Filter Options"
          className="flex items-center  bg-transparent justify-center py-5 px-3 text-gray-600 hover:bg-gray-50  transition-colors focus:outline-none"
        >
          <img
            src={CaretDown}
            alt="caretdown"
            className={
              isOpen
                ? "rotate-180 transition-all duration-300 "
                : "transition-all duration-300"
            }
          />
        </Button>
      </div>
      {isOpen && (
        <div className="w-fit transition-all duration-300 ">
          <SidebarFilter />
        </div>
      )}
    </section>
  );
}
