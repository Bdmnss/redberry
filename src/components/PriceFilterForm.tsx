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
      className="absolute right-0 top-9 z-10 w-[24.5rem] rounded-lg border border-borderColor bg-white p-4"
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
          type="number"
          label="From"
          required
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
        <Input
          type="number"
          label="To"
          required
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
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
