"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ─── Variants ────────────────────────────────────────────────────────────────

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "border-2 transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "active:scale-[0.92]",
    "group",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground border-transparent " +
          "hover:bg-muted hover:border-transparent",

        outline:
          "bg-transparent text-foreground border-foreground " +
          "hover:bg-foreground hover:text-background",

        solid:
          "bg-foreground text-background border-foreground " +
          "hover:bg-foreground/80",

        inverted:
          "bg-background text-foreground border-background " +
          "hover:bg-foreground hover:text-background hover:border-foreground",

        ghost:
          "bg-transparent text-foreground border-transparent " +
          "hover:bg-foreground/10",
      },

      /** Size – controls padding and icon size */
      size: {
        sm: "size-8 [&_svg]:size-4",
        md: "size-10 [&_svg]:size-5",
        lg: "size-12 [&_svg]:size-6",
      },

      /** Shape */
      shape: {
        square: "rounded-none",
        rounded: "rounded-sm",
        circle: "rounded-full border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "square",
    },
  },
)

// ─── Types ───────────────────────────────────────────────────────────────────

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible label — required for screen readers */
  "aria-label": string
  /** Icon to render inside the button */
  icon: React.ReactNode
}

// ─── Component ───────────────────────────────────────────────────────────────

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, shape, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="icon-button"
        className={cn(iconButtonVariants({ variant, size, shape }), className)}
        {...props}
      >
        {icon}
      </button>
    )
  },
)

IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
