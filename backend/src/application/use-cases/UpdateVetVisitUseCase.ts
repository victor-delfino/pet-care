import { VetVisit, UpdateVetVisitInput } from "../../domain/VetVisit";
import { VetVisitRepository } from "../../domain/VetVisitRepository";

export class UpdateVetVisitUseCase {
  constructor(private readonly repository: VetVisitRepository) {}

  async execute(id: string, data: UpdateVetVisitInput): Promise<VetVisit> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Vet visit not found");
    }

    return this.repository.update(id, data);
  }
}
