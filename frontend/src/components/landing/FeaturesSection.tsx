const features = [
  {
    title: "Smart Reminders",
    description:
      "Never forget a vaccine, appointment, or medication. Get notified before it's due.",
    icon: "🔔",
  },
  {
    title: "Health Timeline",
    description:
      "Visualize your pet's complete health history in a beautiful, easy-to-read timeline.",
    icon: "📋",
  },
  {
    title: "Multi-Pet Support",
    description:
      "Manage all your pets from a single dashboard. Each with their own profile and records.",
    icon: "🐾",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Why PetCare
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            Built for pet parents who care
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            A platform designed from the ground up to make pet care
            effortless and organized
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
