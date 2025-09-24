import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import type { Product } from "../types/types";
import ProductGallery from "../components/ProductGallery";
import { useEffect, useState } from "react";
import ProductOptions from "../components/ProductOptions";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

const ProductPage = () => {
  useEffect(() => {
    document.title = "RedSeam | Product";
  }, []);

  const { id } = useParams();
  const productId = id ? Number(id) : undefined;

  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => {
      if (productId === undefined) throw new Error("No product id");
      return getProductById(productId);
    },
    enabled: productId !== undefined,
  });

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  if (isLoading) return <LoadingScreen />;
  if (error)
    return <ErrorScreen message={`Error: ${(error as Error).message}`} />;
  if (!data) return <ErrorScreen message="Product not found." />;

  if (
    selectedColor === "" &&
    data.available_colors &&
    data.available_colors.length > 0
  ) {
    setSelectedColor(data.available_colors[0]);
  }

  if (
    selectedSize === "" &&
    data.available_sizes &&
    data.available_sizes.length > 0
  ) {
    setSelectedSize(data.available_sizes[0]);
  }

  return (
    <main className="px-24 pb-28 pt-8">
      <p className="mb-12 text-sm font-light">Listing / Product</p>
      <div className="flex gap-40">
        <ProductGallery product={data} selectedColor={selectedColor} />

        <ProductOptions
          name={data.name}
          price={data.price}
          availableColors={data.available_colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          availableSizes={data.available_sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          releaseYear={data.release_year}
          description={data.description}
          productId={productId}
        />
      </div>
    </main>
  );
};

export default ProductPage;
