import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { useSearchParams } from "react-router-dom";
import HeaderFilters from "../components/HeaderFilters";
import Pagination from "../components/Pagination";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import type { ProductsResponse } from "../types/types";

export default function Home() {
  useEffect(() => {
    document.title = "RedSeam | Products";
  }, []);

  const [searchParams] = useSearchParams();
  const priceFromParam = searchParams.get("filter[price_from]") || "";
  const priceToParam = searchParams.get("filter[price_to]") || "";
  const sortParam = searchParams.get("sort") || "";
  const pageParam = searchParams.get("page") || "1";

  const { data, error, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["products", priceFromParam, priceToParam, sortParam, pageParam],
    queryFn: () =>
      getProducts({
        price_from: priceFromParam ? Number(priceFromParam) : undefined,
        price_to: priceToParam ? Number(priceToParam) : undefined,
        sort: sortParam || undefined,
        page: Number(pageParam),
      }),
  });

  if (isLoading) return <LoadingScreen />;
  if (error)
    return <ErrorScreen message={`Error: ${(error as Error).message}`} />;
  if (!data) return <ErrorScreen message="No data available." />;

  return (
    <main className="px-24 py-16">
      <HeaderFilters meta={data.meta} />

      <div className="grid grid-cols-4 gap-6">
        {data.data.map((product) => {
          return (
            <div
              key={product.id}
              className="mb-6 flex cursor-pointer flex-col"
              onClick={() => (window.location.href = `/products/${product.id}`)}
            >
              <img
                src={product.cover_image}
                alt={product.name}
                className="mb-3 w-full rounded-lg border-2 border-borderColor object-cover"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="font-medium">$ {product.price}</p>
            </div>
          );
        })}
      </div>

      <Pagination links={data.meta.links} />
    </main>
  );
}
