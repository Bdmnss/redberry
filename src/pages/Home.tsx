import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { useSearchParams } from "react-router-dom";
import HeaderFilters from "../components/HeaderFilters";
import Pagination from "../components/Pagination";
import type { ProductsResponse } from "../types/types";

export default function Home() {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!data) return <div>No data available.</div>;

  console.log(data);

  return (
    <main className="px-24 py-16">
      <HeaderFilters meta={data.meta} />

      <div className="grid grid-cols-4 gap-6">
        {data.data.map((product) => {
          return (
            <div key={product.id} className="mb-6 flex cursor-pointer flex-col">
              <img
                src={product.cover_image}
                alt={product.name}
                className="border-borderColor mb-3 w-full rounded-lg border-2 object-cover"
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
