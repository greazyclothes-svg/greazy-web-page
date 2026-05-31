"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import Image from "next/image"
import { subtitleTypography, titleTypography } from "@/components/design-system"
import { cn, formatPrice } from "@/lib/utils"

type EmblaCarouselApi = NonNullable<UseEmblaCarouselType[1]>

export interface ProductImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  productName: string
  price: number
  discountedPrice: number
  initialIndex?: number
}

function normalizeProgressOffset(offset: number, loop: boolean): number {
  if (!loop) return offset
  if (offset > 0.5) return offset - 1
  if (offset < -0.5) return offset + 1
  return offset
}

function getSnapProgress(emblaApi: EmblaCarouselApi, loop: boolean): number {
  const snaps = emblaApi.scrollSnapList()
  const count = snaps.length

  if (count <= 1) return 0

  const selected = emblaApi.selectedScrollSnap()
  const progress = emblaApi.scrollProgress()
  const anchor = snaps[selected] ?? 0
  const offset = normalizeProgressOffset(progress - anchor, loop)

  if (Math.abs(offset) < 0.0001) return selected

  const nextIndex = loop ? (selected + 1) % count : Math.min(selected + 1, count - 1)
  const prevIndex = loop ? (selected - 1 + count) % count : Math.max(selected - 1, 0)

  if (offset > 0) {
    let range = (snaps[nextIndex] ?? 0) - anchor
    if (loop && range <= 0) range += 1
    if (range <= 0) return selected
    return selected + Math.min(offset / range, 1)
  }

  let range = anchor - (snaps[prevIndex] ?? 0)
  if (loop && range <= 0) range += 1
  if (range <= 0) return selected
  return selected - Math.min(Math.abs(offset) / range, 1)
}

function getSlideDiff(index: number, snapProgress: number, total: number, loop: boolean) {
  let diff = index - snapProgress

  if (loop && total > 1) {
    while (diff > total / 2) diff -= total
    while (diff < -total / 2) diff += total
  }

  return diff
}

function getSlideVisual(diff: number) {
  const distance = Math.abs(diff)
  const t = Math.min(distance, 1)

  const scale = 1 - t * 0.12 - Math.max(distance - 1, 0) * 0.14
  const opacity = 1 - t * 0.48 - Math.max(distance - 1, 0) * 0.22

  return {
    scale: Math.max(scale, 0.7),
    opacity: Math.max(opacity, 0.28),
  }
}

export function ProductImageLightbox({
  isOpen,
  onClose,
  images,
  productName,
  price,
  discountedPrice,
  initialIndex = 0,
}: ProductImageLightboxProps) {
  const loop = images.length > 2
  const [snapProgress, setSnapProgress] = useState(initialIndex)
  const [isDragging, setIsDragging] = useState(false)

  const phone = "573226330880";

  const message =
    `¡Hola!\nEstoy interesado(a) en la prenda ${productName}, quiero acceder al descuento de la página web`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: "center",
    containScroll: false,
    startIndex: initialIndex,
    duration: 24,
    skipSnaps: false,
  })

  const updateSnapProgress = useCallback(() => {
    if (!emblaApi) return
    setSnapProgress(getSnapProgress(emblaApi, loop))
  }, [emblaApi, loop])

  useEffect(() => {
    if (!emblaApi) return

    const onPointerDown = () => setIsDragging(true)
    const onPointerUp = () => setIsDragging(false)
    const onSettle = () => {
      setIsDragging(false)
      updateSnapProgress()
    }

    updateSnapProgress()
    emblaApi.on("scroll", updateSnapProgress)
    emblaApi.on("select", updateSnapProgress)
    emblaApi.on("reInit", updateSnapProgress)
    emblaApi.on("pointerDown", onPointerDown)
    emblaApi.on("pointerUp", onPointerUp)
    emblaApi.on("settle", onSettle)

    return () => {
      emblaApi.off("scroll", updateSnapProgress)
      emblaApi.off("select", updateSnapProgress)
      emblaApi.off("reInit", updateSnapProgress)
      emblaApi.off("pointerDown", onPointerDown)
      emblaApi.off("pointerUp", onPointerUp)
      emblaApi.off("settle", onSettle)
    }
  }, [emblaApi, loop, updateSnapProgress])

  useEffect(() => {
    if (!isOpen) return
    setSnapProgress(initialIndex)
  }, [isOpen, initialIndex])

  useEffect(() => {
    if (!isOpen || !emblaApi) return

    emblaApi.scrollTo(initialIndex, false)
    requestAnimationFrame(() => {
      updateSnapProgress()
    })
  }, [isOpen, initialIndex, emblaApi, updateSnapProgress])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") emblaApi?.scrollPrev()
      if (event.key === "ArrowRight") emblaApi?.scrollNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, emblaApi])

  if (!isOpen || images.length === 0) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${productName}`}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl flex-col items-center px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex h-[50vh] max-h-[420px] items-center">
            {images.map((src, index) => {
              const diff = getSlideDiff(index, snapProgress, images.length, loop)
              const { scale, opacity } = getSlideVisual(diff)
              const isActive = Math.abs(diff) < 0.5

              return (
                <div
                  key={`${src}-${index}`}
                  className="flex h-full min-w-[72%] flex-[0_0_72%] items-center justify-center px-3 sm:min-w-[55%] sm:flex-[0_0_55%]"
                >
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    className="relative flex h-full w-full items-center justify-center"
                    aria-label={`Ver imagen ${index + 1} de ${productName}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div
                      className={cn(
                        "relative aspect-[3/4] h-full max-h-full w-auto overflow-hidden rounded-2xl will-change-[transform,opacity]",
                        !isDragging &&
                          "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      )}
                      style={{
                        transform: `scale(${scale})`,
                        opacity,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${productName} — imagen ${index + 1}`}
                        fill
                        quality={95}
                        sizes="(max-width: 768px) 70vw, 420px"
                        className="object-cover"
                        priority={isActive}
                        draggable={false}
                      />
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className={cn(titleTypography, "text-xl uppercase")}>{productName}</h3>
          <p
            className={cn(
              subtitleTypography,
              "mt-5 text-sm line-through decoration-destructive decoration-solid",
            )}
          >
            {formatPrice(price)}
          </p>
          <p className={cn(subtitleTypography, "mt-1 text-sm")}>
            {formatPrice(discountedPrice)}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(subtitleTypography, "text-md font-bold")}
          >
            Solicitar producto
          </a>
        </div>
      </div>
    </div>
  )
}
