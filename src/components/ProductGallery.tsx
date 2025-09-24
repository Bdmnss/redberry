import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Product } from "../types/types";
import { twMerge } from "tailwind-merge";
import ProductImage from "./ProductImage";

interface ProductGalleryProps {
  product: Product;
  selectedColor?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  selectedColor,
}) => {
  let images = product.images;
  if (
    selectedColor &&
    product.available_colors &&
    product.available_colors.length === images.length
  ) {
    const idx = product.available_colors.findIndex(
      (c) => c.toLowerCase() === selectedColor.toLowerCase(),
    );
    images = idx !== -1 ? [images[idx]] : [images[0]];
  }
  const [activeImage, setActiveImage] = useState(images[0]);
  const [fading, setFading] = useState(false);
  const [mainImageHeight, setMainImageHeight] = useState(0);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const thumbnailListRef = useRef<HTMLUListElement>(null);

  const changeImage = useCallback((newImage: string) => {
    setFading(true);
    setTimeout(() => {
      setActiveImage(newImage);
      setFading(false);
    }, 300);
  }, []);

  const selectImage = (image: string) => {
    if (image !== activeImage) {
      changeImage(image);
    }
  };

  useEffect(() => {
    const updateMainImageHeight = () => {
      if (mainImageRef.current) {
        setMainImageHeight(mainImageRef.current.offsetHeight);
      }
    };

    const mainImage = mainImageRef.current;
    if (mainImage) {
      if (mainImage.complete) {
        updateMainImageHeight();
      } else {
        mainImage.onload = updateMainImageHeight;
      }
    }

    window.addEventListener("resize", updateMainImageHeight);
    return () => window.removeEventListener("resize", updateMainImageHeight);
  }, [activeImage]);

  useEffect(() => {
    if (
      selectedColor &&
      product.available_colors &&
      product.available_colors.length === product.images.length
    ) {
      const idx = product.available_colors.findIndex(
        (c) => c.toLowerCase() === selectedColor.toLowerCase(),
      );
      if (idx !== -1 && product.images[idx] !== activeImage) {
        setActiveImage(product.images[idx]);
      }
    }
  }, [selectedColor, product, activeImage]);

  return (
    <div className="relative flex w-1/2 flex-row gap-6">
      <ul
        ref={thumbnailListRef}
        className="scrollbar-hide flex flex-shrink-0 flex-col gap-4 overflow-y-auto"
        style={{
          maxHeight: mainImageHeight > 0 ? `${mainImageHeight}px` : "384px",
        }}
      >
        {images.map((image, index) => (
          <li
            key={index}
            className={twMerge(
              "w-28 cursor-pointer border-2 border-transparent",
              activeImage === image && "border-buttonColor",
            )}
            onClick={() => selectImage(image)}
          >
            <ProductImage src={image} alt={product.name} className="w-full" />
          </li>
        ))}
      </ul>

      <ProductImage
        src={activeImage}
        alt={product.name}
        className={twMerge(
          "max-h-[58.5625rem] opacity-100 transition-opacity duration-300",
          fading && "opacity-0",
        )}
      />
    </div>
  );
};

export default ProductGallery;
