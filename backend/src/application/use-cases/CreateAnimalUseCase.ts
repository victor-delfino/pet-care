import { Animal, CreateAnimalInput } from "../../domain/Animal";
import { AnimalRepository } from "../../domain/AnimalRepository";

export class CreateAnimalUseCase {
  constructor(private readonly repository: AnimalRepository) {}

  async execute(data: CreateAnimalInput): Promise<Animal> {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Animal name is required");
    }

    if (!data.species || data.species.trim() === "") {
      throw new Error("Animal species is required");
    }

    const animal = await this.repository.create(data);

    return animal;
  }
}
