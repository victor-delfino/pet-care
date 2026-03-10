const categories = [
  {
    icon: "💉",
    title: "Vaccinations",
    description: "Track vaccine schedules and never miss a dose",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: "🩺",
    title: "Vet Visits",
    description: "Complete history of veterinary consultations",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "🍖",
    title: "Nutrition",
    description: "Feeding plans and dietary tracking",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "🧴",
    title: "Grooming",
    description: "Bath schedules and grooming appointments",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: "🏃",
    title: "Exercise",
    description: "Activity logs and exercise routines",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: "💊",
    title: "Medications",
    description: "Medication reminders and dosage tracking",
    color: "bg-pink-50 text-pink-600",
  },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Care categories
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Everything your pet needs, organized in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-gray-100 hover:shadow-md transition cursor-pointer group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${category.color} group-hover:scale-110 transition`}
              >
                {category.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
