import React from "react";
import Icon from "../icons/Icon";

type PriceFilterChipProps = {
  priceFromParam: string;
  priceToParam: string;
  setPriceFrom: (value: string) => void;
  setPriceTo: (value: string) => void;
  setSearchParams: (value: (prev: URLSearchParams) => URLSearchParams) => void;
};

const PriceFilterChip: React.FC<PriceFilterChipProps> = ({
  priceFromParam,
  priceToParam,
  setPriceFrom,
  setPriceTo,
  setSearchParams,
}) => {
  return (
    <div className="border-borderColor mt-4 inline-flex items-center rounded-full border bg-white px-4 py-2">
      <p>
        Price:{" "}
        {priceFromParam ? (
          <span>From {priceFromParam} </span>
        ) : (
          <span>From 0 </span>
        )}
        {priceToParam && <span>To {priceToParam} </span>}
      </p>
      <button
        onClick={() => {
          setPriceFrom("");
          setPriceTo("");
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("filter[price_from]");
            params.delete("filter[price_to]");
            return params;
          });
        }}
      >
        <Icon type="CloseIcon" className="ml-2 size-5" />
      </button>
    </div>
  );
};

export default PriceFilterChip;
