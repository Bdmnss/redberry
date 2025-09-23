import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantityDropdown from "./QuantityDropdown";
import Button from "./Button";
import Icon from "../icons/Icon";
import { Toaster } from "react-hot-toast";
import { useAddToCart } from "../api/useCart";

interface ProductOptionsProps {
  name: string;
  price: number;
  availableColors: string[] | undefined;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  availableSizes: string[] | undefined;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
  releaseYear: string;
  description: string;
  productId?: number;
}

const ProductOptions = ({
  name,
  price,
  availableColors,
  selectedColor,
  setSelectedColor,
  availableSizes,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  releaseYear,
  description,
  productId,
}: ProductOptionsProps) => {
  const mutation = useAddToCart();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || undefined
      : undefined;

  return (
    <div className="flex w-1/2 flex-col gap-14">
      <Toaster position="top-right" />
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-3xl font-semibold">$ {price}</p>
      </div>
      <div className="flex flex-col gap-12">
        {availableColors && (
          <ColorSelector
            availableColors={availableColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        )}

        {availableSizes && (
          <SizeSelector
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        )}

        <div className="flex flex-col gap-4">
          <span>Quantity</span>
          <QuantityDropdown value={quantity} onChange={setQuantity} />
        </div>

        <div className="border-b border-borderColor pb-14">
          <Button
            className="flex items-center justify-center gap-3"
            onClick={() =>
              mutation.mutate({
                productId,
                quantity,
                color: selectedColor,
                size: selectedSize,
                token,
              })
            }
            disabled={mutation.isPending}
          >
            <Icon type="TransparentCartIcon" />
            <span>{mutation.isPending ? "Adding..." : "Add to Cart"}</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-xl font-medium">Details</p>
        <p className="text-secondaryText">Release year: {releaseYear}</p>
        <p className="text-secondaryText">{description}</p>
      </div>
    </div>
  );
};

export default ProductOptions;
