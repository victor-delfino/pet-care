import { FormEvent, useEffect, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { useVetVisits } from "../hooks/useVetVisits";

interface VetVisitFormData {
  animalId: string;
  date: string;
  reason: string;
  diagnosis: string;
  veterinarian: string;
  cost: string;
  notes: string;
}

const emptyForm: VetVisitFormData = {
  animalId: "",
  date: "",
  reason: "",
  diagnosis: "",
  veterinarian: "",
  cost: "",
  notes: "",
};

function toDateInput(isoDate: string): string {
  return isoDate.slice(0, 10);
}

function toIsoDate(date: string): string {
  return `${date}T00:00:00.000Z`;
}

export function VetVisitsPage() {
  const { animals } = useAnimals();
  const { vetVisits, loading, error, create, update, remove } = useVetVisits();
  const [formData, setFormData] = useState<VetVisitFormData>(emptyForm);
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
      if (!formData.date) {
        throw new Error("Visit date is required");
      }

      if (!formData.reason.trim()) {
        throw new Error("Visit reason is required");
      }

      if (editingId) {
        await update(editingId, {
          date: toIsoDate(formData.date),
          reason: formData.reason.trim(),
          diagnosis: formData.diagnosis.trim() || undefined,
          veterinarian: formData.veterinarian.trim() || undefined,
          cost: formData.cost === "" ? undefined : Number(formData.cost),
          notes: formData.notes.trim() || undefined,
        });
      } else {
        if (!formData.animalId) {
          throw new Error("Select an animal");
        }

        await create({
          animalId: formData.animalId,
          date: toIsoDate(formData.date),
          reason: formData.reason.trim(),
          diagnosis: formData.diagnosis.trim() || undefined,
          veterinarian: formData.veterinarian.trim() || undefined,
          cost: formData.cost === "" ? undefined : Number(formData.cost),
          notes: formData.notes.trim() || undefined,
        });
      }

      setEditingId(null);
      setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save visit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const visit = vetVisits.find((item) => item.id === id);
    if (!visit) return;

    setEditingId(visit.id);
    setFormData({
      animalId: visit.animalId,
      date: toDateInput(visit.date),
      reason: visit.reason,
      diagnosis: visit.diagnosis ?? "",
      veterinarian: visit.veterinarian ?? "",
      cost: visit.cost != null ? String(visit.cost) : "",
      notes: visit.notes ?? "",
    });
    setSubmitError(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this visit?")) return;
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

  if (loading) return <div className="p-8 text-center">Loading vet visits...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🩺 Vet Visits</h1>
        <p className="text-gray-600">Track your pets' veterinary visits history</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Visit" : "New Visit"}
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
            <label className="text-sm font-medium text-gray-700">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Reason *</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(event) => setFormData((prev) => ({ ...prev, reason: event.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Diagnosis</label>
            <input
              type="text"
              value={formData.diagnosis}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, diagnosis: event.target.value }))
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
            <label className="text-sm font-medium text-gray-700">Cost</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.cost}
              onChange={(event) => setFormData((prev) => ({ ...prev, cost: event.target.value }))}
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
              {submitting ? "Saving..." : editingId ? "Update" : "Create visit"}
            </button>
          </div>
        </form>
      </div>

      {vetVisits.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🩺</div>
          <p className="text-gray-600">No vet visits registered yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {vetVisits.map((visit) => (
            <div key={visit.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{visit.reason}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Animal: {animalNameById.get(visit.animalId) ?? "Unknown animal"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(visit.date).toLocaleDateString("en-US")}
                  </p>
                  {visit.diagnosis && (
                    <p className="text-sm text-gray-600">Diagnosis: {visit.diagnosis}</p>
                  )}
                  {visit.veterinarian && (
                    <p className="text-sm text-gray-600">Veterinarian: {visit.veterinarian}</p>
                  )}
                  {visit.cost != null && (
                    <p className="text-sm text-green-600 font-medium">Cost: R$ {visit.cost.toFixed(2)}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(visit.id)}
                    className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(visit.id)}
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
