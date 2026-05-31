import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Variants ────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 shrink-0 w-fit",
    "font-medium tracking-widest uppercase whitespace-nowrap",
    "border transition-colors duration-200",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        /** Default dark pill — main label */
        default:
          "bg-foreground text-background border-foreground",

        /** Brand accent (deep red) */
        accent:
          "bg-accent text-accent-foreground border-accent",

        /** Light muted — secondary info */
        muted:
          "bg-muted text-muted-foreground border-transparent",

        /** Transparent with border */
        outline:
          "bg-transparent text-foreground border-foreground",

        /** Inverted — for use on dark backgrounds */
        inverted:
          "bg-background text-foreground border-background",
      },

      size: {
        sm: "px-2 py-0.5 text-[9px] rounded-none",
        md: "px-3 py-1 text-[10px] rounded-none",
        lg: "px-4 py-1.5 text-xs rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

// ─── Component ───────────────────────────────────────────────────────────────

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
