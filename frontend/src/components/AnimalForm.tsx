import { useEffect, useState } from "react";
import { CreateAnimalInput } from "../types/animal";

interface AnimalFormInitialValues {
  name?: string;
  species?: string;
  breed?: string | null;
  birthDate?: string | null;
  weight?: number | null;
}

interface AnimalFormProps {
  onSubmit: (data: CreateAnimalInput) => Promise<void>;
  onCancel?: () => void;
  initialValues?: AnimalFormInitialValues;
  submitLabel?: string;
}

export function AnimalForm({
  onSubmit,
  onCancel,
  initialValues = {},
  submitLabel = "Save",
}: AnimalFormProps) {
  const [name, setName] = useState(initialValues.name ?? "");
  const [species, setSpecies] = useState(initialValues.species ?? "");
  const [breed, setBreed] = useState(initialValues.breed ?? "");
  const [weight, setWeight] = useState(initialValues.weight?.toString() ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialValues.name ?? "");
    setSpecies(initialValues.species ?? "");
    setBreed(initialValues.breed ?? "");
    setWeight(initialValues.weight?.toString() ?? "");
  }, [initialValues.name, initialValues.species, initialValues.breed, initialValues.weight]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit({
        name,
        species,
        breed: breed || undefined,
        weight: weight ? parseFloat(weight) : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Species *</label>
        <input
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Breed</label>
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
