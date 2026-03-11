import { Feeding, CreateFeedingInput } from "../../domain/Feeding";
import { FeedingRepository } from "../../domain/FeedingRepository";

export class CreateFeedingUseCase {
  constructor(private readonly repository: FeedingRepository) {}

  async execute(data: CreateFeedingInput): Promise<Feeding> {
    if (!data.animalId) {
      throw new Error("Animal ID is required");
    }

    if (!data.foodName || data.foodName.trim() === "") {
      throw new Error("Food name is required");
    }

    if (!data.frequency || data.frequency.trim() === "") {
      throw new Error("Feeding frequency is required");
    }

    return this.repository.create(data);
  }
}
