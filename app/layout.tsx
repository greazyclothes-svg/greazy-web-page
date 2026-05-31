import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GRZY — Urban Fashion Colombia",
  description:
    "Descubre las últimas colecciones de GRZY, la marca de moda urbana colombiana. Ropa streetwear para hombre y mujer.",
  keywords: ["GRZY", "Greazy", "moda urbana", "streetwear", "Colombia", "ropa"],
  openGraph: {
    title: "GRZY — Urban Fashion Colombia",
    description:
      "Descubre las últimas colecciones de GRZY, la marca de moda urbana colombiana.",
    type: "website",
    locale: "es_CO",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
