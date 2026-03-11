import { Reminder, UpdateReminderInput } from "../../domain/Reminder";
import { ReminderRepository } from "../../domain/ReminderRepository";

export class UpdateReminderUseCase {
  constructor(private readonly repository: ReminderRepository) {}

  async execute(id: string, data: UpdateReminderInput): Promise<Reminder> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Reminder not found");
    }

    return this.repository.update(id, data);
  }
}
