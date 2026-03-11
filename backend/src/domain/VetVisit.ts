export interface VetVisit {
  id: string;
  animalId: string;
  date: Date;
  reason: string;
  diagnosis: string | null;
  veterinarian: string | null;
  cost: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVetVisitInput {
  animalId: string;
  date: Date;
  reason: string;
  diagnosis?: string;
  veterinarian?: string;
  cost?: number;
  notes?: string;
}

export interface UpdateVetVisitInput {
  date?: Date;
  reason?: string;
  diagnosis?: string;
  veterinarian?: string;
  cost?: number;
  notes?: string;
}
