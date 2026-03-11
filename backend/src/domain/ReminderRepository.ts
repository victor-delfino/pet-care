import { Reminder, CreateReminderInput, UpdateReminderInput } from "./Reminder";

export interface ReminderRepository {
  create(data: CreateReminderInput): Promise<Reminder>;
  findById(id: string): Promise<Reminder | null>;
  findByAnimalId(animalId: string): Promise<Reminder[]>;
  findAll(): Promise<Reminder[]>;
  update(id: string, data: UpdateReminderInput): Promise<Reminder>;
  delete(id: string): Promise<void>;
}
