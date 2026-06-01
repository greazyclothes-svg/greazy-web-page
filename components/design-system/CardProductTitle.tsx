"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardTitleTypography } from "./variables"

const FONT_STEP_PX = 0.5

function cssLengthToPx(value: string, el: HTMLElement): number {
  const trimmed = value.trim()
  if (!trimmed) return NaN
  if (trimmed.endsWith("px")) return parseFloat(trimmed)
  if (trimmed.endsWith("rem")) {
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize)
    return parseFloat(trimmed) * rootPx
  }
  return parseFloat(trimmed)
}

function fitsContainer(el: HTMLElement) {
  return el.scrollWidth <= el.clientWidth + 1
}

function fitTitleFontSize(el: HTMLElement) {
  const styles = getComputedStyle(el)
  const maxPx = parseFloat(styles.fontSize)
  const minPx =
    cssLengthToPx(styles.getPropertyValue("--grzy-title-card-size-min"), el) || maxPx * 0.6

  let size = maxPx
  el.style.fontSize = `${size}px`

  while (size > minPx && !fitsContainer(el)) {
    size -= FONT_STEP_PX
    el.style.fontSize = `${size}px`
  }
}

export interface CardProductTitleProps {
  name: string
  className?: string
}

function CardProductTitle({ name, className }: CardProductTitleProps) {
  const titleRef = React.useRef<HTMLHeadingElement>(null)

  const fitTitle = React.useCallback(() => {
    const el = titleRef.current
    if (!el) return
    el.style.fontSize = ""
    fitTitleFontSize(el)
  }, [name])

  React.useLayoutEffect(() => {
    fitTitle()
    const el = titleRef.current
    if (!el) return

    const observer = new ResizeObserver(fitTitle)
    observer.observe(el)
    return () => observer.disconnect()
  }, [fitTitle])

  return (
    <h4 ref={titleRef} className={cn(cardTitleTypography, className)}>
      {name}
    </h4>
  )
}

export { CardProductTitle }
