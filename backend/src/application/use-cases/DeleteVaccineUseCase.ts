import { VaccineRepository } from "../../domain/VaccineRepository";

export class DeleteVaccineUseCase {
  constructor(private readonly repository: VaccineRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Vaccine not found");
    }

    await this.repository.delete(id);
  }
}
