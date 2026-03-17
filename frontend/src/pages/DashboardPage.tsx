import { useAnimals } from "../hooks/useAnimals";
import { useReminders } from "../hooks/useReminders";
import { useVaccines } from "../hooks/useVaccines";

export function DashboardPage() {
  const { animals, loading } = useAnimals();
  const { vaccines, loading: vaccinesLoading } = useVaccines();
  const { reminders, loading: remindersLoading } = useReminders();

  const now = new Date();
  const pendingVaccinesCount = vaccines.filter(
    (vaccine) => vaccine.nextDoseAt && new Date(vaccine.nextDoseAt) <= now
  ).length;

  const upcomingReminders = reminders
    .filter((reminder) => !reminder.completed)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5);

  const animalNameById = new Map(
    animals.map((animal) => [animal.id, animal.name] as const)
  );

  const stats = [
    {
      label: "Total Animals",
      value: loading ? "—" : animals.length,
      icon: "🐾",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Dogs",
      value: loading ? "—" : animals.filter((a) => a.species.toLowerCase() === "dog").length,
      icon: "🐕",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Cats",
      value: loading ? "—" : animals.filter((a) => a.species.toLowerCase() === "cat").length,
      icon: "🐈",
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Pending Vaccines",
      value: vaccinesLoading ? "—" : pendingVaccinesCount,
      icon: "💉",
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your pet care management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Recent Animals</h2>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : animals.length === 0 ? (
            <p className="text-sm text-gray-400">No animals registered yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {animals.slice(0, 5).map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">
                    {animal.species.toLowerCase() === "dog" ? "🐕" : "🐈"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {animal.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {animal.species}
                      {animal.breed ? ` · ${animal.breed}` : ""}
                    </p>
                  </div>
                  {animal.weight && (
                    <span className="text-xs text-gray-400">
                      {animal.weight} kg
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Upcoming Reminders</h2>
          {remindersLoading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : upcomingReminders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-300">
              <span className="text-4xl mb-3">🔔</span>
              <p className="text-sm">No reminders set yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-100"
                >
                  <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-base">
                    🔔
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{reminder.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {animalNameById.get(reminder.animalId) ?? "Unknown animal"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Due: {new Date(reminder.dueDate).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
