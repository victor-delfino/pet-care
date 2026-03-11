import { VetVisit } from "../../domain/VetVisit";
import { VetVisitRepository } from "../../domain/VetVisitRepository";

export class ListVetVisitsUseCase {
  constructor(private readonly repository: VetVisitRepository) {}

  async execute(animalId?: string): Promise<VetVisit[]> {
    if (animalId) {
      return this.repository.findByAnimalId(animalId);
    }
    return this.repository.findAll();
  }
}
