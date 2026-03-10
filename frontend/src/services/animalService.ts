import { Animal, CreateAnimalInput, UpdateAnimalInput } from "../types/animal";

const BASE_URL = "/animals";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function listAnimals(): Promise<Animal[]> {
  const response = await fetch(BASE_URL);
  return handleResponse<Animal[]>(response);
}

export async function createAnimal(data: CreateAnimalInput): Promise<Animal> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Animal>(response);
}

export async function updateAnimal(id: string, data: UpdateAnimalInput): Promise<Animal> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Animal>(response);
}

export async function deleteAnimal(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
}
