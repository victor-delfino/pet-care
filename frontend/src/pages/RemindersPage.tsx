import { FormEvent, useEffect, useState } from "react";
import { useAnimals } from "../hooks/useAnimals";
import { useReminders } from "../hooks/useReminders";

interface ReminderFormData {
  animalId: string;
  title: string;
  description: string;
  dueDate: string;
}

const emptyForm: ReminderFormData = {
  animalId: "",
  title: "",
  description: "",
  dueDate: "",
};

function toDateInput(isoDate: string): string {
  return isoDate.slice(0, 10);
}

function toIsoDate(date: string): string {
  return `${date}T00:00:00.000Z`;
}

export function RemindersPage() {
  const { animals } = useAnimals();
  const { reminders, loading, error, create, update, remove } = useReminders();
  const [formData, setFormData] = useState<ReminderFormData>(emptyForm);
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
      if (!formData.title.trim()) {
        throw new Error("Title is required");
      }

      if (!formData.dueDate) {
        throw new Error("Due date is required");
      }

      if (editingId) {
        await update(editingId, {
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          dueDate: toIsoDate(formData.dueDate),
        });
      } else {
        if (!formData.animalId) {
          throw new Error("Select an animal");
        }

        await create({
          animalId: formData.animalId,
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          dueDate: toIsoDate(formData.dueDate),
        });
      }

      setEditingId(null);
      setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save reminder");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const reminder = reminders.find((item) => item.id === id);
    if (!reminder) return;

    setEditingId(reminder.id);
    setFormData({
      animalId: reminder.animalId,
      title: reminder.title,
      description: reminder.description ?? "",
      dueDate: toDateInput(reminder.dueDate),
    });
    setSubmitError(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) return;
    await remove(id);

    if (editingId === id) {
      setEditingId(null);
      setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
    }
  };

  const handleToggleCompleted = async (id: string, completed: boolean) => {
    await update(id, { completed: !completed });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSubmitError(null);
    setFormData({ ...emptyForm, animalId: animals[0]?.id ?? "" });
  };

  if (loading) return <div className="p-8 text-center">Loading reminders...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  const pending = reminders.filter((r) => !r.completed);
  const completed = reminders.filter((r) => r.completed);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🔔 Reminders</h1>
        <p className="text-gray-600">Manage pet-care tasks and reminders</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Reminder" : "New Reminder"}
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
            <label className="text-sm font-medium text-gray-700">Due date *</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, dueDate: event.target.value }))
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, description: event.target.value }))
              }
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
              {submitting ? "Saving..." : editingId ? "Update" : "Create reminder"}
            </button>
          </div>
        </form>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🔔</div>
          <p className="text-gray-600">No reminders created yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pending ({pending.length})</h2>
              <div className="grid gap-4">
                {pending.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-lg">{reminder.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Animal: {animalNameById.get(reminder.animalId) ?? "Unknown animal"}
                    </p>
                    {reminder.description && (
                      <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">
                      Due: {new Date(reminder.dueDate).toLocaleDateString("en-US")}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleToggleCompleted(reminder.id, reminder.completed)}
                        className="px-3 py-1.5 text-xs text-green-700 border border-green-200 rounded hover:bg-green-50"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleEdit(reminder.id)}
                        className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">Completed ({completed.length})</h2>
              <div className="grid gap-4">
                {completed.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="border-l-4 border-green-500 bg-green-50 rounded-lg p-4 opacity-60"
                  >
                    <h3 className="font-semibold text-lg line-through">{reminder.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Animal: {animalNameById.get(reminder.animalId) ?? "Unknown animal"}
                    </p>
                    {reminder.description && (
                      <p className="text-sm text-gray-600 mt-1 line-through">{reminder.description}</p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleToggleCompleted(reminder.id, reminder.completed)}
                        className="px-3 py-1.5 text-xs text-blue-700 border border-blue-200 rounded hover:bg-blue-50"
                      >
                        Reopen
                      </button>
                      <button
                        onClick={() => handleEdit(reminder.id)}
                        className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
