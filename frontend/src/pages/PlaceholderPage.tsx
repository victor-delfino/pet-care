interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: string;
}

export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
        <span className="text-6xl">{icon}</span>
        <h2 className="text-xl font-semibold text-gray-700 mt-6">
          Coming Soon
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
          This feature is under development. Stay tuned for updates.
        </p>
      </div>
    </div>
  );
}
