import { useState, useCallback, useEffect } from "react";
import { Vaccine, CreateVaccineInput, UpdateVaccineInput } from "../types/vaccine";
import { listVaccines, createVaccine, updateVaccine, deleteVaccine } from "../services/vaccineService";

export function useVaccines(animalId?: string) {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVaccines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listVaccines(animalId);
      setVaccines(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load vaccines");
    } finally {
      setLoading(false);
    }
  }, [animalId]);

  useEffect(() => {
    fetchVaccines();
  }, [fetchVaccines]);

  const create = useCallback(
    async (data: CreateVaccineInput) => {
      try {
        const newVaccine = await createVaccine(data);
        setVaccines((prev) => [newVaccine, ...prev]);
        return newVaccine;
      } catch (err) {
        throw err instanceof Error ? err : new Error("Failed to create vaccine");
      }
    },
    []
  );

  const update = useCallback(async (id: string, data: UpdateVaccineInput) => {
    try {
      const updated = await updateVaccine(id, data);
      setVaccines((prev) => prev.map((v) => (v.id === id ? updated : v)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update vaccine");
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteVaccine(id);
      setVaccines((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete vaccine");
    }
  }, []);

  return { vaccines, loading, error, create, update, remove, refetch: fetchVaccines };
}
