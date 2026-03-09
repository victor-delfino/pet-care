import { Animal, UpdateAnimalInput } from "../../domain/Animal";
import { AnimalRepository } from "../../domain/AnimalRepository";

export class UpdateAnimalUseCase {
  constructor(private readonly repository: AnimalRepository) {}

  async execute(id: string, data: UpdateAnimalInput): Promise<Animal> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Animal not found");
    }

    const updated = await this.repository.update(id, data);

    return updated;
  }
}
