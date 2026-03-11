export interface Reminder {
  id: string;
  animalId: string;
  title: string;
  description: string | null;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReminderInput {
  animalId: string;
  title: string;
  description?: string;
  dueDate: Date;
}

export interface UpdateReminderInput {
  title?: string;
  description?: string;
  dueDate?: Date;
  completed?: boolean;
}
