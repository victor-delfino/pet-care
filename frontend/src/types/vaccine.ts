export interface Vaccine {
  id: string;
  animalId: string;
  name: string;
  appliedAt: string;
  nextDoseAt: string | null;
  veterinarian: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVaccineInput {
  animalId: string;
  name: string;
  appliedAt: string;
  nextDoseAt?: string;
  veterinarian?: string;
  notes?: string;
}

export interface UpdateVaccineInput {
  name?: string;
  appliedAt?: string;
  nextDoseAt?: string;
  veterinarian?: string;
  notes?: string;
}
