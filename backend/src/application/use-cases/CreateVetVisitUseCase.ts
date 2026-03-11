import { VetVisit, CreateVetVisitInput } from "../../domain/VetVisit";
import { VetVisitRepository } from "../../domain/VetVisitRepository";

export class CreateVetVisitUseCase {
  constructor(private readonly repository: VetVisitRepository) {}

  async execute(data: CreateVetVisitInput): Promise<VetVisit> {
    if (!data.animalId) {
      throw new Error("Animal ID is required");
    }

    if (!data.date) {
      throw new Error("Visit date is required");
    }

    if (!data.reason || data.reason.trim() === "") {
      throw new Error("Visit reason is required");
    }

    return this.repository.create(data);
  }
}
