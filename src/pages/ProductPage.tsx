import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import type { Product } from "../types/types";
import ProductGallery from "../components/ProductGallery";
import { useState } from "react";
import { getBorderStyle, getBackgroundColor } from "../utils/styles";

const ProductPage = () => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!data) return <div>Product not found.</div>;

  if (
    selectedColor === "" &&
    data.available_colors &&
    data.available_colors.length > 0
  ) {
    setSelectedColor(data.available_colors[0]);
  }

  return (
    <main className="px-24 py-8">
      <p className="mb-12 text-sm font-light">Listing / Product</p>
      <div className="flex gap-40">
        <ProductGallery product={data} selectedColor={selectedColor} />
        <div className="flex w-1/2 flex-col gap-14">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <p className="text-3xl font-semibold">$ {data.price}</p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span>Color: {selectedColor}</span>
              {data.available_colors && (
                <div className="flex items-center gap-3">
                  {data.available_colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-none p-0 outline-none transition-colors duration-200"
                      style={{
                        border: getBorderStyle(color, selectedColor),
                      }}
                    >
                      <div
                        className="flex size-9 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: getBackgroundColor(color),
                        }}
                      >
                        {["white", "multi"].includes(color.toLowerCase()) && (
                          <span
                            className="text-xs font-semibold"
                            style={{
                              color:
                                selectedColor === color ? "#FF4000" : "#E1DFE1",
                            }}
                          >
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
