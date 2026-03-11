import { Vaccine } from "../../domain/Vaccine";
import { VaccineRepository } from "../../domain/VaccineRepository";

export class ListVaccinesUseCase {
  constructor(private readonly repository: VaccineRepository) {}

  async execute(animalId?: string): Promise<Vaccine[]> {
    if (animalId) {
      return this.repository.findByAnimalId(animalId);
    }
    return this.repository.findAll();
  }
}
