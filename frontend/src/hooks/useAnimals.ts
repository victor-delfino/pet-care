import { useState, useEffect, useCallback } from "react";
import { Animal, CreateAnimalInput, UpdateAnimalInput } from "../types/animal";
import {
  listAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from "../services/animalService";

interface UseAnimalsReturn {
  animals: Animal[];
  loading: boolean;
  error: string | null;
  create: (data: CreateAnimalInput) => Promise<void>;
  update: (id: string, data: UpdateAnimalInput) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useAnimals(): UseAnimalsReturn {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listAnimals();
      setAnimals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load animals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  const create = async (data: CreateAnimalInput) => {
    const animal = await createAnimal(data);
    setAnimals((prev) => [animal, ...prev]);
  };

  const update = async (id: string, data: UpdateAnimalInput) => {
    const updated = await updateAnimal(id, data);
    setAnimals((prev) => prev.map((a) => (a.id === id ? updated : a)));
  };

  const remove = async (id: string) => {
    await deleteAnimal(id);
    setAnimals((prev) => prev.filter((a) => a.id !== id));
  };

  return { animals, loading, error, create, update, remove };
}
