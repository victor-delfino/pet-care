import { useState, useCallback, useEffect } from "react";
import { Reminder, CreateReminderInput, UpdateReminderInput } from "../types/reminder";
import { listReminders, createReminder, updateReminder, deleteReminder } from "../services/reminderService";

export function useReminders(animalId?: string) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listReminders(animalId);
      setReminders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reminders");
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  const create = useCallback(
    async (data: CreateReminderInput) => {
      try {
        const newReminder = await createReminder(data);
        setReminders((prev) => [newReminder, ...prev]);
        return newReminder;
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create reminder");
      }
    },
    []
  );

  const update = useCallback(async (id: string, data: UpdateReminderInput) => {
    try {
      const updated = await updateReminder(id, data);
      setReminders((prev) => prev.map((r) => (r.id === id ? updated : r)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update reminder");
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete reminder");
    }
  }, []);

  return { reminders, loading, error, create, update, remove, refetch: fetchReminders };
}
