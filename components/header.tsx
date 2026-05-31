"use client"

import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import { IconButton } from "@/components/design-system"

const menuItems = [
  { label: "Colecciones", href: "#colecciones" },
  { label: "Hombre", href: "#hombre" },
  { label: "Mujer", href: "#mujer" },
  { label: "Accesorios", href: "#accesorios" },
]

interface HeaderProps {
  onMenuClick: () => void
  onLogoClick: () => void
}

export function Header({ onMenuClick, onLogoClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  ">
      <div className="rounded-full border border-white/20 m-2 backdrop-blur-md">
        <div className="flex items-center justify-end px-4 py-[2%]">
          {/* Hamburger */}
          {/* <IconButton
            aria-label="Abrir menú"
            icon={<ChevronsRight />}
            variant="ghost"
            size="lg"
            shape="square"
            className="-ml-2 text-white hover:bg-white/10"
            onClick={onMenuClick}
          /> */}

          {/* Logo */}
          <button
            type="button"
            onClick={onLogoClick}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            aria-label="Recargar página"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greazy%20Logo-vComj9fBwMP7H6QmLZOGfMTWSYLhZf.png"
              alt="GRZY Logo"
              width={80}
              height={32}
              className="h-8 w-auto object-contain brightness-0 invert"
              priority
            />
          </button>

          {/* Cart — non-functional placeholder */}
          <IconButton
            aria-label="Carrito de compras"
            icon={<ShoppingBag />}
            variant="ghost"
            size="lg"
            shape="square"
            className="-mr-2 text-white opacity-40 cursor-not-allowed"
            disabled
          />
        </div>
      
      </div>
    </header>
  )
}
