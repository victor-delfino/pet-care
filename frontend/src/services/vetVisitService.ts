import { VetVisit, CreateVetVisitInput, UpdateVetVisitInput } from "../types/vetVisit";

const BASE_URL = "/vet-visits";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function listVetVisits(animalId?: string): Promise<VetVisit[]> {
  const url = animalId ? `${BASE_URL}?animalId=${animalId}` : BASE_URL;
  const response = await fetch(url);
  return handleResponse<VetVisit[]>(response);
}

export async function createVetVisit(data: CreateVetVisitInput): Promise<VetVisit> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<VetVisit>(response);
}

export async function updateVetVisit(id: string, data: UpdateVetVisitInput): Promise<VetVisit> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<VetVisit>(response);
}

export async function deleteVetVisit(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
}
