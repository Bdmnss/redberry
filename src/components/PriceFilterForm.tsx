import Input from "./Input";
import Button from "./Button";

import React from "react";

interface PriceFilterFormProps {
  filterRef: React.RefObject<HTMLFormElement | null>;
  priceFrom: string;
  setPriceFrom: (value: string) => void;
  priceTo: string;
  setPriceTo: (value: string) => void;
  setSearchParams: (params: Record<string, string>) => void;
  setIsFilterOpen: (open: boolean) => void;
}

const PriceFilterForm: React.FC<PriceFilterFormProps> = ({
  filterRef,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  setSearchParams,
  setIsFilterOpen,
}) => {
  return (
    <form
      ref={filterRef}
      className="border-borderColor absolute right-0 top-9 w-[392px] rounded-lg border bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        const params: Record<string, string> = {};
        if (priceFrom) params["filter[price_from]"] = priceFrom;
        if (priceTo) params["filter[price_to]"] = priceTo;
        setSearchParams(params);
        setIsFilterOpen(false);
      }}
    >
      <p className="mb-5 font-semibold">Select price</p>
      <div className="mb-2 flex items-center gap-2">
        <Input
          placeholder="From"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value.replace(/[^\d]/g, ""))}
        />
        <Input
          placeholder="To"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value.replace(/[^\d]/g, ""))}
        />
      </div>
      <div className="flex justify-end">
        <Button className="w-32" type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
};

export default PriceFilterForm;
