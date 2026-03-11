import { VetVisitRepository } from "../../domain/VetVisitRepository";

export class DeleteVetVisitUseCase {
  constructor(private readonly repository: VetVisitRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Vet visit not found");
    }

    await this.repository.delete(id);
  }
}
