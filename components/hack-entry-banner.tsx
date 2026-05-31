"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HackEntryBannerProps {
  onEnter: () => void
  isExiting?: boolean
}

function formatElapsedTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":")
}

export function HackEntryBanner({ onEnter, isExiting = false }: HackEntryBannerProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        "hack-entry-banner fixed inset-0 z-[100] flex flex-col bg-black font-mono text-white",
        "transition-opacity duration-700 ease-out",
        isExiting && "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Acceso al sistema"
    >
      {/* Header */}
      <header className="border-b border-white/20 px-6 py-5 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-[0.35em] sm:text-xl">GREAZY</p>
            <p className="mt-1 text-[10px] tracking-[0.25em] text-white/70 sm:text-xs">
              ATELIER DE INTENCIONES
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] tracking-[0.2em] text-white/70 sm:text-xs">
              ESTADO: COMPROMETIDO
            </p>
            <p className="mt-1 text-sm tracking-widest tabular-nums sm:text-base">
              {formatElapsedTime(elapsed)}
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold tracking-[0.2em] sm:text-4xl md:text-5xl">
          ACCESO NO AUTORIZADO
        </h1>

        <div className="mt-8 max-w-md space-y-1 text-xs leading-relaxed tracking-wide text-white/80 sm:text-sm">
          <p>El sistema ha sido intervenido.</p>
          <p>Archivos temporales expuestos.</p>
          <p>Descuentos no autorizados activados.</p>
        </div>

        <button
          type="button"
          onClick={onEnter}
          className="hack-entry-blink mt-12 text-sm tracking-[0.3em] transition-opacity hover:opacity-80 sm:text-base"
        >
          {"> INGRESAR"}
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 px-6 py-5 sm:px-10">
        <div className="flex flex-col gap-3 text-[10px] tracking-[0.15em] text-white/70 sm:flex-row sm:items-end sm:justify-between sm:text-xs">
          <div>
            <p>G-26 COLLECTIVE®</p>
            <p className="mt-1">ARCHIVE PROTOCOL // V.05</p>
          </div>
          <p>© 2020 — 2026</p>
        </div>
      </footer>
    </div>
  )
}
