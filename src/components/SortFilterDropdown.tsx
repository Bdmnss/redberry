import React from "react";

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
  return (
    <div
      ref={sortRef}
      className="border-borderColor absolute right-0 top-9 flex w-56 flex-col gap-2 rounded-lg border py-4"
    >
      <h3 className="text-primaryText pl-4 font-semibold">Sort by</h3>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          className="py-1 pl-4 text-left hover:bg-gray-100"
          onClick={() => {
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("sort", option.value);
              return params;
            });
            setSortLabel(option.label);
            setIsSortOpen(false);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortFilterDropdown;
