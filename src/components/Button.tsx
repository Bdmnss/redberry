import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { twJoin } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        twJoin("w-full rounded-lg bg-buttonColor py-3 text-white", className),
      )}
      {...props}
    >
      {children}
    </button>
  );
}
