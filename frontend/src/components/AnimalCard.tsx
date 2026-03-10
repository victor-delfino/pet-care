import { Animal } from "../types/animal";

interface AnimalCardProps {
  animal: Animal;
  onEdit: (animal: Animal) => void;
  onDelete: (id: string) => void;
}

export function AnimalCard({ animal, onEdit, onDelete }: AnimalCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">
            {animal.species.toLowerCase() === "dog" ? "🐕" : "🐈"}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{animal.name}</h3>
            <p className="text-xs text-gray-400">{animal.species}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(animal)}
            className="px-2.5 py-1 text-xs text-blue-600 rounded-md hover:bg-blue-50 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(animal.id)}
            className="px-2.5 py-1 text-xs text-red-500 rounded-md hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex gap-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
        {animal.breed && (
          <span className="bg-gray-50 px-2 py-1 rounded">
            {animal.breed}
          </span>
        )}
        {animal.weight && (
          <span className="bg-gray-50 px-2 py-1 rounded">
            {animal.weight} kg
          </span>
        )}
      </div>
    </div>
  );
}
