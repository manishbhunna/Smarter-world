import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#093103] focus-visible:ring-offset-2 focus-visible:ring-offset-[#dbd8cf] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#093103] text-white shadow-forest hover:bg-black hover:shadow-forest-lg active:scale-[0.98]",
        secondary:
          "bg-[#093103] text-white hover:bg-black active:scale-[0.98]",
        outline:
          "border-2 border-[#093103] bg-transparent text-black hover:bg-[#093103] hover:text-white active:scale-[0.98]",
        ghost:
          "text-black hover:bg-[#093103] hover:text-white transition-colors",
        link:
          "text-black underline-offset-4 hover:underline p-0 h-auto font-bold",
        dark:
          "bg-black text-white hover:bg-[#093103] active:scale-[0.98]",
        cyan:
          "bg-[#093103] text-white shadow-forest hover:bg-black active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
