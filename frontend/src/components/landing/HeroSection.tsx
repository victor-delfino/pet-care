import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
            #1 Pet Care Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Complete care for your{" "}
            <span className="text-blue-600">best friend</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg">
            Track vaccinations, vet visits, feeding schedules, and health
            records — all in one place. Because they deserve the best.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              to="/app"
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="px-6 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl">🐾</span>
              <p className="text-gray-400 mt-4 text-sm">Pet illustration</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">200+</p>
              <p className="text-xs text-gray-400">Pets registered</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg">
              ♥
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">98%</p>
              <p className="text-xs text-gray-400">Happy owners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
