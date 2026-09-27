import { useState } from "react";
import Search from "./components/Search";
import BtnMap from "./components/Map";
import SplitFilterButton from "./components/Filter";
import ChooseSpecialistCard from "./components/Choose";
import SidebarFilter from "./components/SidebarFilter";
import Doctors from "./components/Doctors";
import DoctorsMap from "./components/MAP/DoctorsMap";
import type { DoctorsType } from "./types/sort.type";
import { doctors } from "./constants/Sort";

const SearchDoctor = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorsType | null>(
    null,
  );

  const handleSelectDoctor = (doctor: DoctorsType) => {
    setSelectedDoctor(doctor);
    if (!isMapOpen) {
      setIsMapOpen(true);
    }
  };

  const handleToggleMap = () => {
    setIsMapOpen((prev) => !prev);
  };

  return (
    <div className="w-full pb-16">
      <main className="container mx-auto flex flex-col gap-6 px-4">
        <section className="flex w-full items-center gap-4 sm:gap-6">
          <SplitFilterButton
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen((prev) => !prev)}
          />
          <Search />
          <BtnMap isOpen={isMapOpen} onToggle={handleToggleMap} />
        </section>

        <ChooseSpecialistCard />

        <div className="flex items-start gap-6">
          <div
            className={`shrink-0 overflow-hidden transition-[width] duration-500 ease-in-out ${
              isFilterOpen ? "w-80 md:w-90" : "w-0"
            }`}
          >
            <SidebarFilter />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Doctors List */}
              <div
                className={`w-full transition-all duration-300 ${
                  isMapOpen ? "lg:w-1/2" : "w-full"
                }`}
              >
                <Doctors
                  doctors={doctors}
                  selectedDoctorId={selectedDoctor?.id}
                  onSelectDoctor={handleSelectDoctor}
                  isMapOpen={isMapOpen}
                />
              </div>

              {/* Doctors Map */}
              {isMapOpen && (
                <>
                  {/* Background Overlay */}
                  <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsMapOpen(false)}
                  />

                  {/* Full Screen Map */}
                  <div className="fixed items-center inset-0 z-50 h-[80%] mt-20 w-[80%] mx-auto ">
                    <DoctorsMap
                      doctorsList={doctors}
                      selectedDoctor={selectedDoctor}
                      onSelectDoctor={setSelectedDoctor}
                      onClose={() => setIsMapOpen(false)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchDoctor;
