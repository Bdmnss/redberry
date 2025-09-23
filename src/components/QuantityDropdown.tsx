import { useState, useRef, useEffect } from "react";
import DownArrowIcon from "../icons/DownArrowIcon";

interface QuantityDropdownProps {
  value: number;
  onChange: (val: number) => void;
}

const QuantityDropdown = ({ value, onChange }: QuantityDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <div className="relative w-20" ref={dropdownRef}>
      <button
        type="button"
        className="flex h-11 w-full items-center justify-between rounded-lg border border-borderColor px-4 text-primaryText"
        onClick={() => setDropdownOpen((v) => !v)}
        tabIndex={0}
      >
        <span className="font-medium">{value}</span>
        <DownArrowIcon
          className={`ml-2 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>
      {dropdownOpen && (
        <div className="absolute left-0 top-12 z-10 h-56 w-full overflow-y-auto rounded-lg border border-borderColor bg-white shadow-lg">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`w-full px-4 py-2 text-left transition-colors hover:bg-gray-100 ${
                num === value ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => {
                onChange(num);
                setDropdownOpen(false);
              }}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuantityDropdown;
