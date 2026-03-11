import { Vaccine, CreateVaccineInput } from "../../domain/Vaccine";
import { VaccineRepository } from "../../domain/VaccineRepository";

export class CreateVaccineUseCase {
  constructor(private readonly repository: VaccineRepository) {}

  async execute(data: CreateVaccineInput): Promise<Vaccine> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Vaccine name is required");
    }

    if (!data.animalId) {
      throw new Error("Animal ID is required");
    }

    if (!data.appliedAt) {
      throw new Error("Application date is required");
    }

    return this.repository.create(data);
  }
}
