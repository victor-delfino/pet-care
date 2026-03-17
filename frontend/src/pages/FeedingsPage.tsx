import { FormEvent, useEffect, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { useFeedings } from "../hooks/useFeedings";

interface FeedingFormData {
  animalId: string;
  foodName: string;
  frequency: string;
  quantity: string;
  time: string;
  notes: string;
}

const emptyForm: FeedingFormData = {
  animalId: "",
  foodName: "",
  frequency: "",
  quantity: "",
  time: "",
  notes: "",
};

export function FeedingsPage() {
  const { animals } = useAnimals();
  const { feedings, loading, error, create, update, remove } = useFeedings();
  const [formData, setFormData] = useState<FeedingFormData>(emptyForm);
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
      if (!formData.foodName.trim()) {
        throw new Error("Food name is required");
      }

      if (!formData.frequency.trim()) {
        throw new Error("Feeding frequency is required");
      }

      if (editingId) {
        await update(editingId, {
          foodName: formData.foodName.trim(),
          frequency: formData.frequency.trim(),
          quantity: formData.quantity.trim() || undefined,
          time: formData.time.trim() || undefined,
          notes: formData.notes.trim() || undefined,
        });
      } else {
        if (!formData.animalId) {
          throw new Error("Select an animal");
        }

        await create({
          animalId: formData.animalId,
          foodName: formData.foodName.trim(),
          frequency: formData.frequency.trim(),
          quantity: formData.quantity.trim() || undefined,
          time: formData.time.trim() || undefined,
          notes: formData.notes.trim() || undefined,
        });
      }

      setEditingId(null);
      setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save feeding plan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const feeding = feedings.find((item) => item.id === id);
    if (!feeding) return;

    setEditingId(feeding.id);
    setFormData({
      animalId: feeding.animalId,
      foodName: feeding.foodName,
      frequency: feeding.frequency,
      quantity: feeding.quantity ?? "",
      time: feeding.time ?? "",
      notes: feeding.notes ?? "",
    });
    setSubmitError(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this feeding plan?")) return;
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

  if (loading) return <div className="p-8 text-center">Loading feeding plans...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🍖 Feeding</h1>
        <p className="text-gray-600">Manage nutritional plans for your pets</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Plan" : "New Feeding Plan"}
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
            <label className="text-sm font-medium text-gray-700">Food *</label>
            <input
              type="text"
              value={formData.foodName}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, foodName: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Frequency *</label>
            <input
              type="text"
              value={formData.frequency}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, frequency: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="text"
              value={formData.quantity}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, quantity: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Time</label>
            <input
              type="text"
              value={formData.time}
              onChange={(event) => setFormData((prev) => ({ ...prev, time: event.target.value }))}
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
              {submitting ? "Saving..." : editingId ? "Update" : "Create plan"}
            </button>
          </div>
        </form>
      </div>

      {feedings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🍖</div>
          <p className="text-gray-600">No feeding plans registered yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {feedings.map((feeding) => (
            <div key={feeding.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{feeding.foodName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Animal: {animalNameById.get(feeding.animalId) ?? "Unknown animal"}
                  </p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Frequency:</span> {feeding.frequency}
                    </p>
                    {feeding.quantity && (
                      <p className="text-gray-600">
                        <span className="font-medium">Quantity:</span> {feeding.quantity}
                      </p>
                    )}
                    {feeding.time && (
                      <p className="text-gray-600">
                        <span className="font-medium">Time:</span> {feeding.time}
                      </p>
                    )}
                    {feeding.notes && (
                      <p className="text-gray-600">
                        <span className="font-medium">Notes:</span> {feeding.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(feeding.id)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feeding.id)}
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
