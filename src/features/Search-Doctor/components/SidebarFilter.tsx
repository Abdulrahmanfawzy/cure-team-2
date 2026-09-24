import { useState } from "react";
import CaretDown from "@/assets/Vector.svg";
import { Button } from "@/components/ui/button";
import { consultationOptions, sortOptions } from "../constants/Sort";
export default function FilterSidebar() {
  const [filters, setFilters] = useState({
    date: [],
    gender: "Male",
    consultationType: [],
    sort: "most-recommended",
  });

  const [isSortOpen, setIsSortOpen] = useState(true);

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const currentCategory = prev[category];
      const updatedCategory = currentCategory.includes(value)
        ? currentCategory.filter((item: string) => item !== value)
        : [...currentCategory, value];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleGenderChange = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const handleSortChange = (sortValue: string) => {
    setFilters((prev) => ({ ...prev, sort: sortValue }));
  };

  return (
    <aside className="w-full max-w-xs rounded-2xl border transition-all duration-300 transform origin-right scale-y-100 opacity-100 border-gray-200 bg-white p-5 shadow-sm font-sans text-gray-700">
      <div className="mb-6 flex justify-end">
        <div className="inline-flex items-stretch rounded-2xl border border-gray-300 bg-white">
          <div className="w-px bg-gray-300 my-1"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 font-semibold text-gray-800 text-lg">
            Available Date
          </h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-gray-900">
              <input
                type="checkbox"
                checked={filters.date.includes("today")}
                onChange={() => handleCheckboxChange("date", "today")}
                className="w-5 h-5 rounded-xl border-neutral accent-primary text-primary focus:ring-primary"
              />
              <span>Today</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-gray-900">
              <input
                type="checkbox"
                checked={filters.date.includes("tomorrow")}
                onChange={() => handleCheckboxChange("date", "tomorrow")}
                className="w-5 h-5 rounded-xl border-neutral text-primary focus:ring-primary"
              />
              <span>Tomorrow</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-gray-800 text-lg">Gender</h3>
          <div className="flex gap-3">
            <Button
              variant={"default"}
              onClick={() => handleGenderChange("Male")}
              className={`flex-1 py-2 px-4 rounded-xl border font-medium transition-all ${
                filters.gender === "Male"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              Male
            </Button>
            <Button
              onClick={() => handleGenderChange("Female")}
              className={`flex-1 py-2 px-4 rounded-xl border font-medium transition-all ${
                filters.gender === "Female"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              Female
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-gray-800 text-lg">
            Consultation Type
          </h3>
          <div className="space-y-2.5">
            {consultationOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 text-gray-600 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={filters.consultationType.includes(option.value)}
                  onChange={() =>
                    handleCheckboxChange("consultationType", option.value)
                  }
                  className="h-5 w-5 rounded-xl border-neutral text-primary focus:ring-primary"
                />

                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <Button
            variant={"default"}
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex items-center justify-between
             w-full mb-3 text-left 
             bg-transparent 
             text-secondery
             text-lg 
             cursor-pointer
             hover:bg-transparent
             "
          >
            <span>Sort</span>
            <img
              src={CaretDown}
              className={
                isSortOpen
                  ? "rotate-90 transition-all duration-300"
                  : "transition-all duration-300"
              }
              alt="caret-down"
            />
          </Button>
          {isSortOpen && (
            <div className="space-y-2.5 pl-1">
              {sortOptions?.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-gray-600 hover:text-gray-900"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sort === option.value}
                    onChange={() => handleSortChange(option.value)}
                    className="h-5 w-5 border-gray-300 text-primary focus:ring-primary"
                  />

                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
