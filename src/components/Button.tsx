import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`bg-buttonColor w-full rounded-lg py-3 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
