import { useState, useCallback, useEffect } from "react";
import { Feeding, CreateFeedingInput, UpdateFeedingInput } from "../types/feeding";
import { listFeedings, createFeeding, updateFeeding, deleteFeeding } from "../services/feedingService";

export function useFeedings(animalId?: string) {
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listFeedings(animalId);
      setFeedings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feedings");
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  useEffect(() => {
    fetchFeedings();
  }, [fetchFeedings]);

  const create = useCallback(
    async (data: CreateFeedingInput) => {
      try {
        const newFeeding = await createFeeding(data);
        setFeedings((prev) => [newFeeding, ...prev]);
        return newFeeding;
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create feeding");
      }
    },
    []
  );

  const update = useCallback(async (id: string, data: UpdateFeedingInput) => {
    try {
      const updated = await updateFeeding(id, data);
      setFeedings((prev) => prev.map((f) => (f.id === id ? updated : f)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update feeding");
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteFeeding(id);
      setFeedings((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete feeding");
    }
  }, []);

  return { feedings, loading, error, create, update, remove, refetch: fetchFeedings };
}
