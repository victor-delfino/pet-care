import { Reminder, CreateReminderInput } from "../../domain/Reminder";
import { ReminderRepository } from "../../domain/ReminderRepository";

export class CreateReminderUseCase {
  constructor(private readonly repository: ReminderRepository) {}

  async execute(data: CreateReminderInput): Promise<Reminder> {
    if (!data.animalId) {
      throw new Error("Animal ID is required");
    }

    if (!data.title || data.title.trim() === "") {
      throw new Error("Reminder title is required");
    }

    if (!data.dueDate) {
      throw new Error("Due date is required");
    }

    return this.repository.create(data);
  }
}
