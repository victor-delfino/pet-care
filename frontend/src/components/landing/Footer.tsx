export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-3">PetCare</h3>
            <p className="text-sm leading-relaxed max-w-sm">
              The complete platform for managing your pet's health,
              nutrition, and wellness. Built with love for pet parents.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  GitHub
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  LinkedIn
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Contact
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>© 2026 PetCare.</p>
        </div>
      </div>
    </footer>
  );
}
