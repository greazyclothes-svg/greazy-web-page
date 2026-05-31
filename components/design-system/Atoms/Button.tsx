"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../variables"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  /** Render as a child component (e.g. Next.js Link) */
  asChild?: boolean
  /** Show a loading spinner and disable interaction */
  loading?: boolean
  /** Icon placed before the label */
  leftIcon?: React.ReactNode
  /** Icon placed after the label */
  rightIcon?: React.ReactNode
}

// ─── Component ───────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      sharp,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        disabled={disabled || loading}
        aria-busy={loading}
        // Ejemplo de uso de variables como clases utilitarias de Tailwind
        className={cn(
          buttonVariants({ variant, size, sharp, fullWidth }),
          className,
        )}
        {...props}
      >
        {/* Shine sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-white/10 skew-x-[-20deg]
                     group-hover:translate-x-[150%] transition-transform duration-700 ease-out"
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = "Button"

// ─── Loading Spinner ─────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin size-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export { Button, buttonVariants }
