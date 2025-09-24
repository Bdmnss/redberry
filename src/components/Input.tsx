import { type InputHTMLAttributes, forwardRef, useState } from "react";
import EyeOn from "../icons/EyeOn";
import EyeOff from "../icons/EyeOff";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isPassword?: boolean;
  label?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", isPassword, label, required, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const type = isPassword ? (show ? "text" : "password") : props.type;

    const hasValue =
      props.value !== undefined
        ? String(props.value).length > 0
        : props.defaultValue !== undefined
          ? String(props.defaultValue).length > 0
          : false;

    const isLabelFloating = isFocused || hasValue;

    return (
      <div className="mb-4">
        <div className="relative">
          <input
            ref={ref}
            className={`w-full rounded-lg border border-borderColor px-3 pb-2 pt-6 text-primaryText transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primaryText ${
              error ? "border-buttonColor" : ""
            } ${isPassword ? "pr-10" : ""} ${className}`}
            type={type}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {label && (
            <label
              className={`pointer-events-none absolute left-3 transition-all duration-200 ${
                isLabelFloating
                  ? "top-1 text-xs text-secondaryText"
                  : "top-1/2 -translate-y-1/2 text-base text-secondaryText"
              } ${error ? "text-buttonColor" : ""}`}
            >
              {label}
              {required && <span className="ml-1 text-buttonColor">*</span>}
            </label>
          )}

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-secondaryText transition-colors hover:text-primaryText"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff /> : <EyeOn />}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-buttonColor" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default Input;
