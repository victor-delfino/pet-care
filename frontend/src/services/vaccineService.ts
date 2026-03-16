import { Vaccine, CreateVaccineInput, UpdateVaccineInput } from "../types/vaccine";

const BASE_URL = "/vaccines";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function listVaccines(animalId?: string): Promise<Vaccine[]> {
  const url = animalId ? `${BASE_URL}?animalId=${animalId}` : BASE_URL;
  const response = await fetch(url);
  return handleResponse<Vaccine[]>(response);
}

export async function createVaccine(data: CreateVaccineInput): Promise<Vaccine> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Vaccine>(response);
}

export async function updateVaccine(id: string, data: UpdateVaccineInput): Promise<Vaccine> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Vaccine>(response);
}

export async function deleteVaccine(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
}
