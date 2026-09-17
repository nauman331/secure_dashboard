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
          "bg-[#2563EB] text-white shadow-2xs",
        brandSoft:
          "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",
        success:
          "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
        warning:
          "bg-amber-50 text-amber-800 border border-amber-200/70",
        destructive:
          "bg-rose-50 text-rose-700 border border-rose-200/70",
        info:
          "bg-blue-50 text-blue-700 border border-blue-200/70",
        indigo:
          "bg-indigo-50 text-indigo-700 border border-indigo-200/70",
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
