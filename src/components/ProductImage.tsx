import { useState } from "react";
import Spinner from "./Spinner";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
};

export default function ProductImage({
  src,
  alt,
  className = "",
  onClick,
}: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative h-full w-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        onClick={onClick}
      />
    </div>
  );
}
