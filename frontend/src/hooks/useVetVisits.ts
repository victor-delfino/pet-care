import { useState, useCallback, useEffect } from "react";
import { VetVisit, CreateVetVisitInput, UpdateVetVisitInput } from "../types/vetVisit";
import { listVetVisits, createVetVisit, updateVetVisit, deleteVetVisit } from "../services/vetVisitService";

export function useVetVisits(animalId?: string) {
  const [vetVisits, setVetVisits] = useState<VetVisit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVetVisits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listVetVisits(animalId);
      setVetVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load vet visits");
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  useEffect(() => {
    fetchVetVisits();
  }, [fetchVetVisits]);

  const create = useCallback(
    async (data: CreateVetVisitInput) => {
      try {
        const newVisit = await createVetVisit(data);
        setVetVisits((prev) => [newVisit, ...prev]);
        return newVisit;
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create vet visit");
      }
    },
    []
  );

  const update = useCallback(async (id: string, data: UpdateVetVisitInput) => {
    try {
      const updated = await updateVetVisit(id, data);
      setVetVisits((prev) => prev.map((v) => (v.id === id ? updated : v)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update vet visit");
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteVetVisit(id);
      setVetVisits((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete vet visit");
    }
  }, []);

  return { vetVisits, loading, error, create, update, remove, refetch: fetchVetVisits };
}
