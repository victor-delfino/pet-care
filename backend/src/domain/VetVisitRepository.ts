import { VetVisit, CreateVetVisitInput, UpdateVetVisitInput } from "./VetVisit";

export interface VetVisitRepository {
  create(data: CreateVetVisitInput): Promise<VetVisit>;
  findById(id: string): Promise<VetVisit | null>;
  findByAnimalId(animalId: string): Promise<VetVisit[]>;
  findAll(): Promise<VetVisit[]>;
  update(id: string, data: UpdateVetVisitInput): Promise<VetVisit>;
  delete(id: string): Promise<void>;
}
