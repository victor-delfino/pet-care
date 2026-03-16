import { Feeding, CreateFeedingInput, UpdateFeedingInput } from "../types/feeding";

const BASE_URL = "/feedings";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function listFeedings(animalId?: string): Promise<Feeding[]> {
  const url = animalId ? `${BASE_URL}?animalId=${animalId}` : BASE_URL;
  const response = await fetch(url);
  return handleResponse<Feeding[]>(response);
}

export async function createFeeding(data: CreateFeedingInput): Promise<Feeding> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Feeding>(response);
}

export async function updateFeeding(id: string, data: UpdateFeedingInput): Promise<Feeding> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Feeding>(response);
}

export async function deleteFeeding(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
}
