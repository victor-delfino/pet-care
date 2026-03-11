import { Vaccine, UpdateVaccineInput } from "../../domain/Vaccine";
import { VaccineRepository } from "../../domain/VaccineRepository";

export class UpdateVaccineUseCase {
  constructor(private readonly repository: VaccineRepository) {}

  async execute(id: string, data: UpdateVaccineInput): Promise<Vaccine> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Vaccine not found");
    }

    return this.repository.update(id, data);
  }
}
