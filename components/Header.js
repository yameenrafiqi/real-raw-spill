import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-black text-white border-b-8 border-yellow-400 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-3xl md:text-4xl font-black tracking-tighter hover:text-yellow-400 transition-colors transform hover:scale-105 inline-block"
          >
            RAWSPILL
          </Link>
          <div className="flex gap-2 md:gap-4">
            <Link 
              href="/" 
              className={`px-4 py-2 font-black uppercase text-sm md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2 font-black uppercase text-sm md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/about" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              About
            </Link>
            <Link 
              href="/admin" 
              className={`px-4 py-2 font-black uppercase text-sm md:text-base border-2 transition-all transform hover:scale-105 ${
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
