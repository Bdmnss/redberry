import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { useSearchParams } from "react-router-dom";
import HeaderFilters from "../components/HeaderFilters";

export default function Home() {
  const [searchParams] = useSearchParams();
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

  return (
    <main className="px-24 py-16">
      <HeaderFilters meta={data.meta} />
    </main>
  );
}
