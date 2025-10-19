"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isGreenYouPage = pathname?.startsWith("/hebergement");

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm py-2 px-4 flex items-center justify-between" suppressHydrationWarning>
      <div className="flex items-center gap-6" suppressHydrationWarning>
        {/* Deux marques côte à côte */}
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <Link href="/" className="font-bold text-xl text-blue-600 hover:text-blue-700 transition-colors" suppressHydrationWarning>
            LmaaMap
          </Link>
          <span className="text-gray-300" suppressHydrationWarning>|</span>
          <Link href="/hebergement" className="font-bold text-xl text-green-700 hover:text-green-800 transition-colors" suppressHydrationWarning>
            GreenYou
          </Link>
        </div>
        
        {/* Navigation */}
        <Link href="/map" className="text-gray-700 hover:text-blue-600" suppressHydrationWarning>Carte</Link>
      </div>
      <div className="flex items-center gap-2">
        {/* Ajoutez ici d'autres liens ou boutons si besoin */}
      </div>
    </nav>
  );
}
