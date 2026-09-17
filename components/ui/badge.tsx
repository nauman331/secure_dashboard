import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-normal transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#0F172A] text-white shadow-2xs",
        secondary:
          "bg-[#F1F5F9] text-[#334155]",
        outline:
          "border border-[#E2E8F0] text-[#334155] bg-white",
        brand:
          "bg-[#FF5F1F] text-white shadow-2xs",
        brandSoft:
          "bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]",
        success:
          "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
        warning:
          "bg-amber-50 text-amber-800 border border-amber-200/70",
        destructive:
          "bg-rose-50 text-rose-700 border border-rose-200/70",
        info:
          "bg-sky-50 text-sky-700 border border-sky-200/70",
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

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
