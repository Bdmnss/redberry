import { getBorderStyle, getBackgroundColor } from "../utils/styles";

interface ColorSelectorProps {
  availableColors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorSelector = ({
  availableColors,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span>Color: {selectedColor}</span>
      <div className="flex items-center gap-3">
        {availableColors.map((color) => (
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
                    color: selectedColor === color ? "#FF4000" : "#E1DFE1",
                  }}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
