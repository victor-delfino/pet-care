export interface Vaccine {
  id: string;
  animalId: string;
  name: string;
  appliedAt: Date;
  nextDoseAt: Date | null;
  veterinarian: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVaccineInput {
  animalId: string;
  name: string;
  appliedAt: Date;
  nextDoseAt?: Date;
  veterinarian?: string;
  notes?: string;
}

export interface UpdateVaccineInput {
  name?: string;
  appliedAt?: Date;
  nextDoseAt?: Date;
  veterinarian?: string;
  notes?: string;
}
