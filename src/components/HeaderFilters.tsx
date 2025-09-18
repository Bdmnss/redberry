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
  const [sortLabel, setSortLabel] = useState("Sort by");

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

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-primaryText text-4xl font-semibold">Products</h1>
        <div className="flex items-center">
          <p className="text-secondaryText border-r-borderColor border-r pr-8 text-xs">
            Showing {from}-{to} of {total} results
          </p>
          <div className="relative mr-8 flex items-center pl-8">
            <button
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Icon type="FilterIcon" />
              <span className="text-primaryText">Filter</span>
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
              <span className="text-primaryText">{sortLabel}</span>
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
    </>
  );
}
