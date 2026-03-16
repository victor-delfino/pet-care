export interface VetVisit {
  id: string;
  animalId: string;
  date: string;
  reason: string;
  diagnosis: string | null;
  veterinarian: string | null;
  cost: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVetVisitInput {
  animalId: string;
  date: string;
  reason: string;
  diagnosis?: string;
  veterinarian?: string;
  cost?: number;
  notes?: string;
}

export interface UpdateVetVisitInput {
  date?: string;
  reason?: string;
  diagnosis?: string;
  veterinarian?: string;
  cost?: number;
  notes?: string;
}
