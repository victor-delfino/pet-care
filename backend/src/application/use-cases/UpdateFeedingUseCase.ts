import { Feeding, UpdateFeedingInput } from "../../domain/Feeding";
import { FeedingRepository } from "../../domain/FeedingRepository";

export class UpdateFeedingUseCase {
  constructor(private readonly repository: FeedingRepository) {}

  async execute(id: string, data: UpdateFeedingInput): Promise<Feeding> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Feeding not found");
    }

    return this.repository.update(id, data);
  }
}
