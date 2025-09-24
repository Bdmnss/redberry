import { useState, useRef, useEffect } from "react";
import Icon from "../icons/Icon";
import { useSearchParams } from "react-router-dom";
import PriceFilterForm from "./PriceFilterForm";
import SortFilterDropdown from "./SortFilterDropdown";
import PriceFilterChip from "./PriceFilterChip";

export default function HeaderFilters({
  meta: { from, to, total },
}: {
  meta: { from: number; to: number; total: number };
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceFromParam = searchParams.get("filter[price_from]") || "";
  const priceToParam = searchParams.get("filter[price_to]") || "";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState<string>(priceFromParam);
  const [priceTo, setPriceTo] = useState<string>(priceToParam);
  const SORT_OPTIONS = [
    { value: "created_at", label: "New products first" },
    { value: "price", label: "Price, low to high" },
    { value: "-price", label: "Price, high to low" },
  ];

  const sortValue = searchParams.get("sort");
  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortValue)?.label || "Sort by";
  const [sortLabel, setSortLabel] = useState(currentSortLabel);

  const filterRef = useRef<HTMLFormElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (
        isSortOpen &&
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen, isSortOpen]);

  useEffect(() => {
    setSortLabel(currentSortLabel);
  }, [currentSortLabel, sortValue]);

  return (
    <div className="mb-8">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Products</h1>
        <div className="flex items-center">
          <p className="border-r border-r-borderColor pr-8 text-xs text-secondaryText">
            Showing {from}-{to} of {total} results
          </p>
          <div className="relative mr-8 flex items-center pl-8">
            <button
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Icon type="FilterIcon" />
              <span>Filter</span>
            </button>
            {isFilterOpen && (
              <PriceFilterForm
                filterRef={filterRef}
                priceFrom={priceFrom}
                setPriceFrom={setPriceFrom}
                priceTo={priceTo}
                setPriceTo={setPriceTo}
                setSearchParams={setSearchParams}
                setIsFilterOpen={setIsFilterOpen}
              />
            )}
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-1"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span>{sortLabel}</span>
              <Icon type="DownArrowIcon" />
            </button>
            {isSortOpen && (
              <SortFilterDropdown
                sortRef={sortRef}
                setSearchParams={setSearchParams}
                setSortLabel={setSortLabel}
                setIsSortOpen={setIsSortOpen}
              />
            )}
          </div>
        </div>
      </div>
      {(priceFromParam || priceToParam) && (
        <PriceFilterChip
          priceFromParam={priceFromParam}
          priceToParam={priceToParam}
          setPriceFrom={setPriceFrom}
          setPriceTo={setPriceTo}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
}
