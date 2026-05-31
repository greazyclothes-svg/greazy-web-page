"use client"


const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Colecciones", href: "/collections" },
    { label: "Productos", href: "/products" },
    { label: "Contacto", href: "/contact" },
]

interface NavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Nav({ isOpen, onClose }: NavProps) {
    return (

        <>
            
            <div
                className={`fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            <nav
                className={`fixed top-0 left-0 z-50 h-full w-72 bg-background shadow-xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="text-lg font-semibold text-foreground">Menú</span>

                </div>

                <ul className="py-4">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                onClick={onClose}
                                className="block px-6 py-4 text-lg font-medium text-foreground hover:bg-muted hover:text-accent transition-colors border-b border-border/50"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="absolute bottom-8 left-0 right-0 px-6">
                    <div className="h-px bg-border mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                        GRZY - Urban Fashion
                    </p>
                </div>
            </nav>
        </>
    )
}