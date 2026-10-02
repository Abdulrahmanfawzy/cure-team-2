import { useState } from "react";
import Search from "./components/Search";
import BtnMap from "./components/Map";
import SplitFilterButton from "./components/Filter";
import ChooseSpecialistCard from "./components/Choose";
import SidebarFilter from "./components/SidebarFilter";
import Doctors from "./components/Doctors";
import DoctorsMap from "./components/MAP/DoctorsMap";
import type { DoctorsType } from "./types/sort.type";
import { useSearch } from "./hooks/useSearch";
import { useSearchParams } from "react-router-dom";
import DoctorsNotFound from "./ui/NotFoundDoctors";
import axios from "axios";

const SearchDoctor = () => {
  // =============================Start States =========================================//
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorsType | null>(
    null,
  );
  // =============================End States =========================================//

  // =============================Start Hooks =========================================//
  const [searchParam, setSearchParam] = useSearchParams();
  const page = Number(searchParam.get("page")) || 1;
  const { data: doctors, isLoading, error, refetch, isError } = useSearch(searchParam, page);
  // Hide "Next Page" unless the response says another page exists.
  const pagination = doctors?.pagination;
  const hasNextPage = Boolean(
    pagination?.last_page != null &&
      pagination?.current_page != null &&
      pagination.current_page < pagination.last_page,
  );
  // =============================End Hooks =========================================//

  // =============================Start Functions===================================//
  const handelNextPage = () => {
    setSearchParam(
      (prev) => {
        const next = new URLSearchParams(prev);
        const currentPage = Number(next.get("page")) || 1;
        next.set("page", String(currentPage + 1));
        return next;
      },
      { replace: true }
    );
  };
  const handleSelectDoctor = (doctor: DoctorsType) => {
    setSelectedDoctor(doctor);
    if (!isMapOpen) {
      setIsMapOpen(true);
    }
  };

  const handleToggleMap = () => {
    setIsMapOpen((prev) => !prev);
  };
  //===================================================================================//
  //=============================End Functions===================================//
  if (isError) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404) {
        return <DoctorsNotFound type="empty" onRetry={refetch} />;
      }

      if (status === 422) {
        return <DoctorsNotFound type="error" onRetry={refetch} />;
      }
    }

    return <DoctorsNotFound type="error" onRetry={refetch} />;

  }

  return (
    <div className="w-full pb-16 mt-10">
      <main className="container-main flex flex-col gap-4 sm:gap-6 px-6 lg:px-10">
        <section className="flex w-full items-center gap-2 sm:gap-4 md:gap-6">
          <SplitFilterButton
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen((prev) => !prev)}
          />
          <Search setSearchParam={setSearchParam} searchParam={searchParam} />
          <BtnMap isOpen={isMapOpen} onToggle={handleToggleMap} />
        </section>

        <ChooseSpecialistCard setSearchParam={setSearchParam} />

        <div className="flex items-start gap-6 flex-col md:flex-row">
          {/* Filter Sidebar - collapsible on mobile, sliding sidebar on md+ */}
          <div
            className={`w-full md:w-80 shrink-0 transition-all duration-300 ease-in-out ${isFilterOpen ? "block" : "hidden md:hidden md:w-0"
              }`}
          >
            <SidebarFilter />
          </div>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Doctors List */}
              <div className="w-full">
                <Doctors
                  doctors={doctors}
                  selectedDoctorId={selectedDoctor?.id}
                  onSelectDoctor={handleSelectDoctor}
                  isMapOpen={isMapOpen}
                  handelNextPage={handelNextPage}
                  isLoading={isLoading}
                  hasNextPage={hasNextPage}
                />
              </div>

              {/* Doctors Map Modal */}
              {isMapOpen && (
                <>
                  {/* Background Overlay */}
                  <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setIsMapOpen(false)}
                  />

                  {/* Responsive Map Modal */}
                  <div className="fixed inset-3 sm:inset-6 md:inset-10 lg:inset-16 z-50 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full max-w-5xl pointer-events-auto rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col">
                      <DoctorsMap
                        doctors={doctors}
                        selectedDoctor={selectedDoctor}
                        onSelectDoctor={setSelectedDoctor}
                        onClose={() => setIsMapOpen(false)}
                      />
                    </div>
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
