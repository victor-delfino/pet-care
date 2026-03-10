import { useState } from "react";
import { Animal } from "../types/animal";
import { useAnimals } from "../hooks/useAnimals";
import { AnimalCard } from "../components/AnimalCard";
import { AnimalForm } from "../components/AnimalForm";

type FormMode = "hidden" | "create" | "edit";

export function AnimalsPage() {
  const { animals, loading, error, create, update, remove } = useAnimals();
  const [formMode, setFormMode] = useState<FormMode>("hidden");
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const handleCreate = async (data: Parameters<typeof create>[0]) => {
    await create(data);
    setFormMode("hidden");
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setFormMode("edit");
  };

  const handleUpdate = async (data: Parameters<typeof update>[1]) => {
    if (!editingAnimal) return;
    await update(editingAnimal.id, data);
    setFormMode("hidden");
    setEditingAnimal(null);
  };

  const handleCancel = () => {
    setFormMode("hidden");
    setEditingAnimal(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Animals</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all your registered pets
          </p>
        </div>
        {formMode === "hidden" && (
          <button
            onClick={() => setFormMode("create")}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            + New Animal
          </button>
        )}
      </div>

      {formMode === "create" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">New Animal</h2>
          <AnimalForm
            onSubmit={handleCreate}
            onCancel={handleCancel}
            submitLabel="Create"
          />
        </div>
      )}

      {formMode === "edit" && editingAnimal && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Edit Animal</h2>
          <AnimalForm
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            initialValues={editingAnimal}
            submitLabel="Update"
          />
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-500 text-center py-10">Loading...</p>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
      )}

      {!loading && animals.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <span className="text-5xl">🐾</span>
          <p className="text-gray-400 mt-4">No animals registered yet.</p>
          <p className="text-xs text-gray-300 mt-1">
            Click "+ New Animal" to get started
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onEdit={handleEdit}
            onDelete={remove}
          />
        ))}
      </div>
    </div>
  );
}
