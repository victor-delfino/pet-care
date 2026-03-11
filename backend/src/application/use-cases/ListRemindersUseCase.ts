import { Reminder } from "../../domain/Reminder";
import { ReminderRepository } from "../../domain/ReminderRepository";

export class ListRemindersUseCase {
  constructor(private readonly repository: ReminderRepository) {}

  async execute(animalId?: string): Promise<Reminder[]> {
    if (animalId) {
      return this.repository.findByAnimalId(animalId);
    }
    return this.repository.findAll();
  }
}
