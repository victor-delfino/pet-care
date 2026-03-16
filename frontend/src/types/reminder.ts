export interface Reminder {
  id: string;
  animalId: string;
  title: string;
  description: string | null;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderInput {
  animalId: string;
  title: string;
  description?: string;
  dueDate: string;
}

export interface UpdateReminderInput {
  title?: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}
