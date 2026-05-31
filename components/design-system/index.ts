/**
 * GRZY Design System
 *
 * Barrel export — import any primitive from here:
 *   import { Button, IconButton, Badge, ProductCard } from "@/components/design-system"
 */

export { Button, buttonVariants } from "./Atoms/Button"
export type { ButtonProps } from "./Atoms/Button"

export { IconButton, iconButtonVariants } from "./IconButton"
export type { IconButtonProps } from "./IconButton"

export { Badge, badgeVariants } from "./Badge"
export type { BadgeProps } from "./Badge"

export { ProductCard } from "./ProductCard"
export type { ProductCardProps } from "./ProductCard"

export {
  titleTypography,
  subtitleTypography,
  bodyTypography,
  titleOnSurface,
  subtitleOnSurface,
  displayFont,
  subtitleFont,
  TitleFont,
  SubTitleFont,
} from "./variables"
