import { twMerge, twJoin } from "tailwind-merge";

interface SizeSelectorProps {
  availableSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const SizeSelector = ({
  availableSizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span>Size: {selectedSize}</span>
      <div className="flex items-center gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={twMerge(
              twJoin(
                "flex h-11 w-16 items-center justify-center rounded-lg border text-primaryText",
                size === selectedSize
                  ? "border-primaryText"
                  : "border-borderColor",
              ),
            )}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
