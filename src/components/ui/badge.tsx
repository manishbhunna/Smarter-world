import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border border-[#093103] bg-[#093103] text-white shadow-sm",
        secondary:
          "border border-[#093103]/30 bg-[#dbd8cf] text-black",
        outline:
          "border border-[#093103] text-black bg-transparent",
        success:
          "border border-[#093103] bg-[#093103] text-white shadow-sm",
        accent:
          "border border-[#093103] bg-[#093103] text-white shadow-sm",
        cyan:
          "border border-[#093103] bg-[#093103] text-white shadow-sm",
        amber:
          "border border-[#093103] bg-[#093103] text-white shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
