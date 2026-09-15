import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-md text-sm",
        "focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
