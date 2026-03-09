import { Animal } from "../../domain/Animal";
import { AnimalRepository } from "../../domain/AnimalRepository";

export class ListAnimalsUseCase {
  constructor(private readonly repository: AnimalRepository) {}

  async execute(): Promise<Animal[]> {
    const animals = await this.repository.findAll();
    return animals;
  }
}
