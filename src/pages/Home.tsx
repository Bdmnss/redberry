import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import Icon from "../icons/Icon";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS = [
  { value: "created_at", label: "New products first" },
  { value: "price", label: "Price, low to high" },
  { value: "-price", label: "Price, high to low" },
];

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceFrom, setPriceFrom] = useState<string>(
    searchParams.get("filter[price_from]") || "",
  );
  const [priceTo, setPriceTo] = useState<string>(
    searchParams.get("filter[price_to]") || "",
  );
  const [sortLabel, setSortLabel] = useState("Sort by");

  const priceFromParam = searchParams.get("filter[price_from]") || "";
  const priceToParam = searchParams.get("filter[price_to]") || "";
  const sortParam = searchParams.get("sort") || "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", priceFromParam, priceToParam, sortParam],
    queryFn: () =>
      getProducts({
        price_from: priceFromParam ? Number(priceFromParam) : undefined,
        price_to: priceToParam ? Number(priceToParam) : undefined,
        sort: sortParam || undefined,
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  //   console.log("Products:", data);

  return (
    <main className="px-24 py-16">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-primaryText text-4xl font-semibold">Products</h1>
        <div className="flex items-center">
          <p className="text-secondaryText border-r-borderColor border-r pr-8 text-xs">
            Showing {data.meta.from}-{data.meta.to} of {data.meta.total} results
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
              <form
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
                <p className="text-primaryText mb-5 font-semibold">
                  Select price
                </p>
                <div className="mb-2 flex items-center gap-2">
                  <Input
                    placeholder="From"
                    value={priceFrom}
                    onChange={(e) =>
                      setPriceFrom(e.target.value.replace(/[^\d]/g, ""))
                    }
                  />
                  <Input
                    placeholder="To"
                    value={priceTo}
                    onChange={(e) =>
                      setPriceTo(e.target.value.replace(/[^\d]/g, ""))
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="w-32" type="submit">
                    Apply
                  </Button>
                </div>
              </form>
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
              <div className="border-borderColor absolute right-0 top-9 flex w-56 flex-col gap-2 rounded-lg border py-4">
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
            )}
          </div>
        </div>
      </div>
      {(priceFrom || priceTo) && (
        <div className="border-borderColor inline-flex items-center rounded-full border bg-white px-4 py-2">
          <p>
            Price:{" "}
            {priceFrom ? <span>From {priceFrom} </span> : <span>From 0 </span>}
            {priceTo && <span>To {priceTo} </span>}
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
      )}
    </main>
  );
}
