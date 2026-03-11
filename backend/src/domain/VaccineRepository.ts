import { Vaccine, CreateVaccineInput, UpdateVaccineInput } from "./Vaccine";

export interface VaccineRepository {
  create(data: CreateVaccineInput): Promise<Vaccine>;
  findById(id: string): Promise<Vaccine | null>;
  findByAnimalId(animalId: string): Promise<Vaccine[]>;
  findAll(): Promise<Vaccine[]>;
  update(id: string, data: UpdateVaccineInput): Promise<Vaccine>;
  delete(id: string): Promise<void>;
}
