import { AnimalRepository } from "../../domain/AnimalRepository";

export class DeleteAnimalUseCase {
  constructor(private readonly repository: AnimalRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      throw new Error("Animal not found");
    }

    await this.repository.delete(id);
  }
}
