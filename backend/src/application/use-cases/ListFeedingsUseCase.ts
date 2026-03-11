import { Feeding } from "../../domain/Feeding";
import { FeedingRepository } from "../../domain/FeedingRepository";

export class ListFeedingsUseCase {
  constructor(private readonly repository: FeedingRepository) {}

  async execute(animalId?: string): Promise<Feeding[]> {
    if (animalId) {
      return this.repository.findByAnimalId(animalId);
    }
    return this.repository.findAll();
  }
}
