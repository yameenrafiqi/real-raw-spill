import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-black text-white border-b-4 md:border-b-8 border-yellow-400 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 md:py-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl sm:text-2xl md:text-4xl tracking-tighter hover:text-yellow-400 transition-colors transform hover:scale-105 inline-block"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            RAWSPILL
          </Link>
          <div className="flex gap-1 sm:gap-2 md:gap-4">
            <Link 
              href="/" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/articles" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/articles" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Articles
            </Link>
            <Link 
              href="/about" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/about" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/contact" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/admin" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/admin" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
