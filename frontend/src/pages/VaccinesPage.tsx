import { FormEvent, useEffect, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { useVaccines } from "../hooks/useVaccines";

interface VaccineFormData {
  animalId: string;
  name: string;
  appliedAt: string;
  nextDoseAt: string;
  veterinarian: string;
  notes: string;
}

const emptyForm: VaccineFormData = {
  animalId: "",
  name: "",
  appliedAt: "",
  nextDoseAt: "",
  veterinarian: "",
  notes: "",
};

function toDateInput(isoDate: string | null): string {
  return isoDate ? isoDate.slice(0, 10) : "";
}

function toIsoDate(date: string): string {
  return `${date}T00:00:00.000Z`;
}

export function VaccinesPage() {
  const { animals } = useAnimals();
  const { vaccines, loading, error, create, update, remove } = useVaccines();
  const [formData, setFormData] = useState<VaccineFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!editingId && !formData.animalId && animals.length > 0) {
      setFormData((prev) => ({ ...prev, animalId: animals[0].id }));
    }
  }, [animals, editingId, formData.animalId]);

  const animalNameById = new Map(
    animals.map((animal) => [animal.id, animal.name] as const)
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      if (!formData.name.trim()) {
        throw new Error("Vaccine name is required");
      }

      if (!formData.appliedAt) {
        throw new Error("Application date is required");
      }

      if (editingId) {
        await update(editingId, {
          name: formData.name.trim(),
          appliedAt: toIsoDate(formData.appliedAt),
          nextDoseAt: formData.nextDoseAt ? toIsoDate(formData.nextDoseAt) : undefined,
          veterinarian: formData.veterinarian.trim() || undefined,
          notes: formData.notes.trim() || undefined,
        });
      } else {
        if (!formData.animalId) {
          throw new Error("Select an animal");
        }

        await create({
          animalId: formData.animalId,
          name: formData.name.trim(),
          appliedAt: toIsoDate(formData.appliedAt),
          nextDoseAt: formData.nextDoseAt ? toIsoDate(formData.nextDoseAt) : undefined,
          veterinarian: formData.veterinarian.trim() || undefined,
          notes: formData.notes.trim() || undefined,
        });
      }

      setEditingId(null);
      setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save vaccine");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const vaccine = vaccines.find((item) => item.id === id);
    if (!vaccine) return;

    setEditingId(vaccine.id);
    setFormData({
      animalId: vaccine.animalId,
      name: vaccine.name,
      appliedAt: toDateInput(vaccine.appliedAt),
      nextDoseAt: toDateInput(vaccine.nextDoseAt),
      veterinarian: vaccine.veterinarian ?? "",
      notes: vaccine.notes ?? "",
    });
    setSubmitError(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this vaccine?")) return;
    await remove(id);

    if (editingId === id) {
      setEditingId(null);
      setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSubmitError(null);
    setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
  };

  if (loading) return <div className="p-8 text-center">Loading vaccines...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">💉 Vaccines</h1>
        <p className="text-gray-600">Manage vaccination schedules for your pets</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Vaccine" : "New Vaccine"}
        </h2>

        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded mb-4">{submitError}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Animal *</label>
            <select
              value={formData.animalId}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, animalId: event.target.value }))
              }
              disabled={Boolean(editingId)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            >
              <option value="">Select</option>
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Vaccine name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Application date *</label>
            <input
              type="date"
              value={formData.appliedAt}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, appliedAt: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Next dose</label>
            <input
              type="date"
              value={formData.nextDoseAt}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, nextDoseAt: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Veterinarian</label>
            <input
              type="text"
              value={formData.veterinarian}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, veterinarian: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Saving..." : editingId ? "Update" : "Create vaccine"}
            </button>
          </div>
        </form>
      </div>

      {vaccines.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">💉</div>
          <p className="text-gray-600">No vaccines registered yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {vaccines.map((vaccine) => (
            <div key={vaccine.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{vaccine.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Animal: {animalNameById.get(vaccine.animalId) ?? "Unknown animal"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Applied on {new Date(vaccine.appliedAt).toLocaleDateString("en-US")}
                  </p>
                  {vaccine.veterinarian && (
                    <p className="text-sm text-gray-600">Veterinarian: {vaccine.veterinarian}</p>
                  )}
                  {vaccine.nextDoseAt && (
                    <p className="text-sm text-blue-600 font-medium">
                      Next dose: {new Date(vaccine.nextDoseAt).toLocaleDateString("en-US")}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(vaccine.id)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vaccine.id)}
                    className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
