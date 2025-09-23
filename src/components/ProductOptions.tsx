import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantityDropdown from "./QuantityDropdown";

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
}: ProductOptionsProps) => {
  return (
    <div className="flex w-1/2 flex-col gap-14">
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
      </div>
    </div>
  );
};

export default ProductOptions;
