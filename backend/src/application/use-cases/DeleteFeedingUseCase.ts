import { FeedingRepository } from "../../domain/FeedingRepository";

export class DeleteFeedingUseCase {
  constructor(private readonly repository: FeedingRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Feeding not found");
    }

    await this.repository.delete(id);
  }
}
