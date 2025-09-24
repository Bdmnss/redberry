import React from "react";

interface SpinnerProps {
  isBig?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isBig = false }) => {
  const size = isBig ? 120 : 60;
  const strokeWidth = 4;
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#FF4000"
          strokeWidth={strokeWidth}
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Spinner;
