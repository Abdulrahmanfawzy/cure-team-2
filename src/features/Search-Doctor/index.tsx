import { useState } from "react";
import Search from "./components/Search";
import BtnMap from "./components/Map";
import SplitFilterButton from "./components/Filter";
import ChooseSpecialistCard from "./components/Choose";
import SidebarFilter from "./components/SidebarFilter";

const SearchDoctor = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full">
      <main className="container mx-auto flex flex-col gap-6">
        <section className="flex w-full items-center gap-6">
          <SplitFilterButton
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen((prev) => !prev)}
          />
          <Search />
          <BtnMap />
        </section>
        <ChooseSpecialistCard />
        <div
          className={`
      shrink-0 overflow-hidden
      transition-[width] duration-500 ease-in-out
      ${isFilterOpen ? "w-[300px]" : "w-0"}
    `}
        >
          <div className="w-[300px]">
            <SidebarFilter />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchDoctor;
