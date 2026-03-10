import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-blue-600 tracking-tight">
          PetCare
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition">
            Features
          </a>
          <a href="#categories" className="hover:text-gray-900 transition">
            Categories
          </a>
          <a href="#about" className="hover:text-gray-900 transition">
            About
          </a>
        </div>

        <Link
          to="/app"
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
        >
          Open App
        </Link>
      </div>
    </nav>
  );
}
