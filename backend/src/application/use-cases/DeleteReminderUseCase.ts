import { ReminderRepository } from "../../domain/ReminderRepository";

export class DeleteReminderUseCase {
  constructor(private readonly repository: ReminderRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Reminder not found");
    }

    await this.repository.delete(id);
  }
}
