import { Animal, CreateAnimalInput, UpdateAnimalInput } from "./Animal";

export interface AnimalRepository {
  create(data: CreateAnimalInput): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  findAll(): Promise<Animal[]>;
  update(id: string, data: UpdateAnimalInput): Promise<Animal>;
  delete(id: string): Promise<void>;
}
