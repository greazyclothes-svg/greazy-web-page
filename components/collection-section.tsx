"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button, ProductCard, subtitleFont, titleTypography } from "@/components/design-system"
import { ProductImageLightbox } from "@/components/product-image-lightbox"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  discountedPrice: number
  image: string
  images?: string[]
}

interface CollectionSectionProps {
  id: string
  name: string
  image: string
  products: Product[]
}

interface SelectedProduct {
  name: string
  images: string[]
  initialIndex: number
  price: number
  discountedPrice:number
}

export function CollectionSection({ id, name, image, products }: CollectionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleProductClick = (product: Product) => {
    const images = product.images?.length ? product.images : [product.image]
    const initialIndex = Math.max(0, images.indexOf(product.image))

    setSelectedProduct({
      name: product.name,
      images,
      initialIndex,
      price: product.price,
      discountedPrice: product.discountedPrice
    })
  }

  return (
    <section ref={sectionRef} id={id} className="relative w-full h-screen overflow-hidden">
      {/* Base Layer: Full-screen hero image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={`Colección ${name}`}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent pointer-events-none" />

        {/* Info + CTA */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 pb-12 transition-all duration-500 z-10 ${isExpanded ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
            }`}
        >
          <h2 className={cn(titleTypography, "mb-4")}>
            {name}
          </h2>

          <Button
            variant="primary"
            size="md"
            className={subtitleFont}
            rightIcon={<ChevronDown />}
            onClick={() => setIsExpanded(true)}
          >
            Ver colección
          </Button>
        </div>
      </div>

      {/* Clickable overlay to close the bottom sheet (Top 50%) */}
      {isExpanded && (
        <div
          className="absolute top-0 left-0 right-0 h-1/2 z-20 cursor-pointer"
          onClick={() => setIsExpanded(false)}
          aria-label="Cerrar colección"
        />
      )}

      {/* Sliding Bottom Sheet (Bottom 50%) */}
      <div
      id="contenedor-colecciones"
        className={`absolute bottom-0 left-0 right-0 h-1/2
          bg-transparent
          backdrop-blur-md
          rounded-4xl
          border border-white/50
          z-30 transition-transform duration-500 
          ease-in-out shadow-[0_-10px_40px_rgba(0,0,0,0.3)]
          flex items-center justify-center
          ${isExpanded ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="scrollbar-hide h-full w-9/10 overflow-y-auto pt-6 pb-8 px-4 flex flex-col">
          {/* Dragger / Header */}
          <div className="bg-transparent flex items-center 
          justify-between mb-6 shrink-0 top-0 bg-background z-10 pb-4">
            <h3 className={cn(titleTypography, "flex items-center gap-2")}>
              {name}
            </h3>
            
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discountedPrice={product.discountedPrice}
                image={product.image}
                onImageClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProductImageLightbox
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        images={selectedProduct?.images ?? []}
        productName={selectedProduct?.name ?? ""}
        price={selectedProduct?.price ?? 0}
        discountedPrice={selectedProduct?.discountedPrice ?? 0}
        initialIndex={selectedProduct?.initialIndex ?? 0}
      />
    </section>
  )
}