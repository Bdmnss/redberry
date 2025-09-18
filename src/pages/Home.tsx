import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import Icon from "../icons/Icon";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceFrom, setPriceFrom] = useState<string>(
    searchParams.get("filter[price_from]") || "",
  );
  const [priceTo, setPriceTo] = useState<string>(
    searchParams.get("filter[price_to]") || "",
  );

  const priceFromParam = searchParams.get("filter[price_from]") || "";
  const priceToParam = searchParams.get("filter[price_to]") || "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", priceFromParam, priceToParam],
    queryFn: () =>
      getProducts({
        price_from: priceFromParam ? Number(priceFromParam) : undefined,
        price_to: priceToParam ? Number(priceToParam) : undefined,
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  console.log("Products:", data);

  return (
    <main className="px-24 py-16">
      <div className="flex items-center justify-between">
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

          <div>
            <button className="flex items-center gap-1">
              <span className="text-primaryText">Sort by</span>
              <Icon type="DownArrowIcon" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
