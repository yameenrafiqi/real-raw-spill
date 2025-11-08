export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-8 border-yellow-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black mb-4">RAWSPILL</h3>
            <p className="font-mono text-gray-400 text-sm leading-relaxed">
              RawSpill exists as a space to pause, breathe, and write with intention. Writing here is a meditation, a mindful practice that turns reflection into clarity. It captures the raw contours of a life in motion, inviting others to find their own meaning in its words.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-black mb-4 text-yellow-400">QUICK LINKS</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
              <li><a href="/admin" className="hover:text-yellow-400 transition">Admin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black mb-4 text-yellow-400">CONNECT</h4>
                        <a 
              href="mailto:syednayer@rawspill.com" 
              className="hover:text-yellow-400 transition-colors font-mono"
            >
              syednayer@rawspill.com
            </a>
            <p className="font-mono text-gray-400 text-sm">
              Response: ~1 week
            </p>
          </div>
        </div>
        <div className="border-t-2 border-gray-800 pt-8">
          <p className="text-center font-mono text-sm text-gray-400">
            © {new Date().getFullYear()} RAWSPILL • Built with Next.js, MongoDB & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
