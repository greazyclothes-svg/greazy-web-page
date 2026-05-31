import { cva } from "class-variance-authority";

// ─── Tipografía ──────────────────────────────────────────────────────────────
// Clases CSS definidas en app/globals.css (.grzy-title, .grzy-subtitle, .grzy-body).
// Para cambiar fuente/color global: edita --grzy-* en :root de app/globals.css.

/** Títulos principales (ej. nombre de colección en hero) */
export const titleTypography = "grzy-title";

/** Subtítulos */
export const subtitleTypography = "grzy-subtitle";

/** Texto de cuerpo */
export const bodyTypography = "grzy-body";

/** Título sobre fondo claro (panel, cards) */
export const titleOnSurface = "grzy-title--on-surface";

/** Subtítulo sobre fondo claro */
export const subtitleOnSurface = "grzy-subtitle--on-surface";

/** Solo familia Lemon Milk (botones, labels, etc.) */
export const displayFont = "font-display";

/** Solo familia Manrope (precios, subtítulos, etc.) */
export const subtitleFont = "font-subtitle";

/** @deprecated Usa displayFont o titleTypography */
export const TitleFont = displayFont;
/** @deprecated Usa subtitleFont o subtitleTypography */
export const SubTitleFont = subtitleFont;


// ─── Variants ────────────────────────────────────────────────────────────────

export const buttonVariants = cva(
  // Base — shared by every variant
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full border border-white/20 backdrop-blur-md",
    "font-medium tracking-wide uppercase text-xs",
    "border transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "relative overflow-hidden", // for shine effect
    "group",
  ],
  {
    variants: {
      /** Visual style */
      variant: {
        /** Glass claro — mismo estilo que el header */
        primary: [
          "rounded-full border-2 border-white/20 backdrop-blur-sm text-white",
        ].join(" "),

        /** White fill with dark border — secondary action */
        secondary:
          "bg-background text-foreground border-foreground " +
          "hover:bg-foreground hover:text-background " +
          "active:scale-[0.98]",

        /** Brand accent (deep red) */
        accent:
          "bg-accent text-accent-foreground border-accent " +
          "hover:bg-accent/85 hover:border-accent/85 " +
          "active:scale-[0.98]",

        /** Transparent with border */
        outline:
          "bg-transparent text-foreground border-foreground " +
          "hover:bg-foreground hover:text-background " +
          "active:scale-[0.98]",

        /** Transparent, no border — subtle action */
        ghost:
          "bg-transparent text-foreground border-transparent " +
          "hover:bg-muted hover:border-transparent " +
          "active:scale-[0.98]",

        /** Inverted — for use on dark/image backgrounds */
        inverted:
          "bg-background text-foreground border-background " +
          "hover:bg-foreground hover:text-background hover:border-foreground " +
          "active:scale-[0.98]",
      },

      /** Size */
      size: {
        sm: "h-8 px-4 text-[10px] [&_svg]:size-3.5",
        md: "h-10 px-6 text-xs [&_svg]:size-4",
        lg: "h-12 px-8 text-sm [&_svg]:size-4",
        xl: "h-14 px-10 text-sm [&_svg]:size-5",
      },

      /** Remove rounded corners for sharp streetwear feel */
      sharp: {
        true: "rounded-none",
        false: "rounded-full",
      },

      /** Full-width block button */
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      sharp: false,
      fullWidth: false,
    },
  },
)
