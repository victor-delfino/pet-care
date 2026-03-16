import { Reminder, CreateReminderInput, UpdateReminderInput } from "../types/reminder";

const BASE_URL = "/reminders";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function listReminders(animalId?: string): Promise<Reminder[]> {
  const url = animalId ? `${BASE_URL}?animalId=${animalId}` : BASE_URL;
  const response = await fetch(url);
  return handleResponse<Reminder[]>(response);
}

export async function createReminder(data: CreateReminderInput): Promise<Reminder> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Reminder>(response);
}

export async function updateReminder(id: string, data: UpdateReminderInput): Promise<Reminder> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Reminder>(response);
}

export async function deleteReminder(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? "Request failed");
  }
}
