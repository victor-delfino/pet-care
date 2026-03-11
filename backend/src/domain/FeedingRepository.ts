import { Feeding, CreateFeedingInput, UpdateFeedingInput } from "./Feeding";

export interface FeedingRepository {
  create(data: CreateFeedingInput): Promise<Feeding>;
  findById(id: string): Promise<Feeding | null>;
  findByAnimalId(animalId: string): Promise<Feeding[]>;
  findAll(): Promise<Feeding[]>;
  update(id: string, data: UpdateFeedingInput): Promise<Feeding>;
  delete(id: string): Promise<void>;
}
