import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 text-6xl">🐾</div>
            <div className="absolute bottom-10 right-10 text-6xl">🐾</div>
            <div className="absolute top-1/2 left-1/3 text-4xl">🐾</div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start caring better today
            </h2>
            <p className="text-blue-100 max-w-lg mx-auto mb-8 text-lg">
              Join hundreds of pet owners who trust PetCare to keep their
              furry friends healthy and happy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/app"
                className="px-8 py-3 text-sm font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50 transition shadow-lg"
              >
                Get Started Free
              </Link>
              <a
                href="#features"
                className="px-8 py-3 text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition"
              >
                See Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
