"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { CollectionSection } from "@/components/collection-section"
import { HackEntryBanner } from "@/components/hack-entry-banner"
import { subtitleFont } from "@/components/design-system"
import collections from "@/utils/MockCollectionData"
import { Nav } from "@/components/nav"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [isBannerExiting, setIsBannerExiting] = useState(false)

  const handleLogoClick = () => {
    window.location.reload()
  }

  const handleEnterSite = () => {
    setIsBannerExiting(true)
    window.setTimeout(() => {
      setHasEntered(true)
    }, 700)
  }

  useEffect(() => {
    if (hasEntered) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [hasEntered])

  return (
    <>
      {!hasEntered && (
        <HackEntryBanner onEnter={handleEnterSite} isExiting={isBannerExiting} />
      )}

      <main
        className={cn(
          "min-h-screen bg-background transition-opacity duration-700",
          !hasEntered && "opacity-0",
        )}
      >
        <Header
          onMenuClick={() => setIsNavOpen(true)}
          onLogoClick={handleLogoClick}
        />

        <Nav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

        <div id="colecciones">
          {collections.map((collection) => (
            <CollectionSection
              key={collection.id}
              id={collection.id}
              name={collection.name}
              image={collection.image}
              products={collection.products}
            />
          ))}
        </div>

        <footer className="bg-foreground px-6 text-background">
          <div className="flex flex-col items-center gap-4">
            <p className={cn(subtitleFont, "text-sm text-background/60")}>
              © 2025 GRZY. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
