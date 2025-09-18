import { type InputHTMLAttributes, forwardRef, useState } from "react";
import EyeOn from "../icons/EyeOn";
import EyeOff from "../icons/EyeOff";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", isPassword, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const type = isPassword ? (show ? "text" : "password") : props.type;
    return (
      <div>
        <div className="relative">
          <input
            ref={ref}
            className={`border-borderColor placeholder:text-secondaryText text-primaryText w-full rounded-lg border px-3 py-2 focus:outline-none ${
              isPassword ? "pr-10" : ""
            } ${className}`}
            type={type}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              className="text-secondaryText absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              onClick={() => setShow((v) => !v)}
            >
              {show ? <EyeOff /> : <EyeOn />}
            </button>
          )}
        </div>
        {error && <p className="text-buttonColor mt-1 text-xs">{error}</p>}
      </div>
    );
  },
);

export default Input;
