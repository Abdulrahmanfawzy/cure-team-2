import { useState } from "react";
import CaretDown from "@/assets/Vector.svg";
import { Button } from "@/components/ui/button";
import { consultationOptions, sortOptions } from "../constants/Sort";
import { useSearchParams } from "react-router-dom";

export default function FilterSidebar() {
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [searchParam, setSearchParam] = useSearchParams();

  // ─── Helpers to read current filter values from URL ───────────────────────
  const gender = searchParam.get("gender") || "";
  const sort = searchParam.get("sort") || "";
  const availableDate = searchParam.get("available_data") || "";

  // Consultation type can be multi-value → stored as comma-separated
  const consultationType = searchParam.get("consultation_type") || "";


  // ─── Setters ──────────────────────────────────────────────────────────────
  const setParam = (key: string, value: string | null) => {
    setSearchParam(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        // Reset page when filters change
        next.delete("page");
        return next;
      },
      { replace: true }
    );
  };

  const handleGenderChange = (value: string) => {
    // Toggle: clicking the active gender clears it
    setParam("gender", gender === value ? null : value);
  };

 const handleConsultationTypeChange = (value: string) => {
  setParam(
    "consultation_type",
    consultationType === value ? null : value
  );
};

  const handleDateChange = (value: string) => {
    // Toggle: clicking the active date clears it
    setParam("available_data", availableDate === value ? null : value);
  };

  const handleSortChange = (value: string) => {
    setParam("sort", sort === value ? null : value);
  };

  const handleClearAll = () => {
    setSearchParam(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("gender");
        next.delete("consultation_type");
        next.delete("available_data");
        next.delete("sort");
        next.delete("page");
        return next;
      },
      { replace: true }
    );
  };

  const hasActiveFilters = !!(gender || consultationType || availableDate || sort);

  return (
    <aside className="w-full rounded-2xl border transition-all duration-300 border-gray-200 bg-white p-4 sm:p-5 shadow-sm font-sans text-gray-700">
      {/* Header */}
      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-base">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* ── Available Date ── */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-800 text-lg">
            Available Date
          </h3>
          <div className="space-y-2.5">
            {["today", "tomorrow"].map((day) => (
              <label
                key={day}
                className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={availableDate === day}
                  onChange={() => handleDateChange(day)}
                  className="w-5 h-5 rounded-xl border-neutral accent-primary text-primary focus:ring-primary"
                />
                <span className="capitalize">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Gender ── */}
        <div>
          <h3 className="mb-3 font-semibold text-gray-800 text-lg">Gender</h3>
          <div className="flex gap-3">
            {["male", "female"].map((g) => (
              <Button
                key={g}
                type="button"
                onClick={() => handleGenderChange(g)}
                className={`flex-1 py-2 px-4 rounded-xl border font-medium transition-all ${
                  gender === g
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                }`}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>

        {/* ── Consultation Type ── */}
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
     
                  checked={consultationType === option.value}
                  onChange={() => handleConsultationTypeChange(option.value)}
                  className="h-5 w-5 rounded-xl border-neutral text-primary focus:ring-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Sort ── */}
        <div>
          <Button
            variant="default"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex items-center justify-between w-full mb-3 text-left bg-transparent text-secondery text-lg cursor-pointer hover:bg-transparent"
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
              {sortOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 text-gray-600 hover:text-gray-900"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sort === option.value}
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
