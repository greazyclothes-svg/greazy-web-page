import * as React from "react"
import Image from "next/image"
import { cn, formatPrice } from "@/lib/utils"
import { Button } from "./Atoms/Button"
import { CardProductTitle } from "./CardProductTitle"
import { subtitleTypography } from "./variables"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  name: string
  /** Precio original (se muestra tachado) */
  price: number
  /** Precio con descuento */
  discountedPrice: number
  image: string
  images?: string[]
  /** Optional collection label shown as a top badge */
  collectionLabel?: string
  /** Show "Agregar al carrito" CTA button */
  showCta?: boolean
  /** Called when the CTA button is clicked */
  onAddToCart?: (id: string) => void
  /** Called when the card/image is clicked */
  onImageClick?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────

function ProductCard({
  id,
  name,
  price,
  discountedPrice,
  image,
  collectionLabel,
  showCta = false,
  onAddToCart,
  onImageClick,
  className,
  ...props
}: ProductCardProps) {
  return (
    <div
      data-slot="product-card"
      className={cn("group cursor-pointer", className)}
      {...props}
      onClick={(event) => {
        props.onClick?.(event)
        onImageClick?.()
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          quality={90}
          sizes="(max-width: 768px) 45vw, 22vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {collectionLabel && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-black/30 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
            {collectionLabel}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 p-4 pb-5">
          <CardProductTitle name={name} />
          <p
            className={cn(
              subtitleTypography,
              "mt-1.5 text-sm line-through decoration-destructive text-destructive",
            )}
          >
            {formatPrice(price)}
          </p>
          <p className={cn(subtitleTypography, "mt-1 text-sm")}>
            {formatPrice(discountedPrice)}
          </p>
        </div>

        {showCta && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
            <Button
              variant="inverted"
              size="sm"
              fullWidth
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart?.(id)
              }}
            >
              Agregar al carrito
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { ProductCard }
