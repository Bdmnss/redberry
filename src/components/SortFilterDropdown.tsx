import React from "react";
import CloseIcon from "../icons/CloseIcon";

type SortFilterDropdownProps = {
  sortRef: React.RefObject<HTMLDivElement | null>;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  setSortLabel: (label: string) => void;
  setIsSortOpen: (open: boolean) => void;
};

const SORT_OPTIONS = [
  { value: "created_at", label: "New products first" },
  { value: "price", label: "Price, low to high" },
  { value: "-price", label: "Price, high to low" },
];

const SortFilterDropdown: React.FC<SortFilterDropdownProps> = ({
  sortRef,
  setSearchParams,
  setSortLabel,
  setIsSortOpen,
}) => {
  const selectedSort = new URLSearchParams(window.location.search).get("sort");

  return (
    <div ref={sortRef}>
      <div className="absolute right-0 top-9 flex w-56 flex-col gap-2 rounded-lg border border-borderColor bg-white py-4">
        <h3 className="pl-4 font-semibold">Sort by</h3>
        {SORT_OPTIONS.map((option) => {
          const isSelected = selectedSort === option.value;
          return (
            <div key={option.value} className="relative flex items-center">
              <button
                className="w-full py-1 pl-4 text-left hover:bg-gray-100"
                onClick={() => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("sort", option.value);
                    return params;
                  });
                  setSortLabel(option.label);
                  setIsSortOpen(false);
                }}
                disabled={isSelected}
              >
                {option.label}
              </button>
              {isSelected && (
                <button
                  className="absolute right-2 rounded p-1 hover:bg-gray-200"
                  aria-label="Remove sort filter"
                  onClick={() => {
                    setSearchParams((prev) => {
                      const params = new URLSearchParams(prev);
                      params.delete("sort");
                      return params;
                    });
                    setSortLabel("");
                    setIsSortOpen(false);
                  }}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortFilterDropdown;
