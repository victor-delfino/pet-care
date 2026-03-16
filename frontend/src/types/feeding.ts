export interface Feeding {
  id: string;
  animalId: string;
  foodName: string;
  frequency: string;
  quantity: string | null;
  time: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedingInput {
  animalId: string;
  foodName: string;
  frequency: string;
  quantity?: string;
  time?: string;
  notes?: string;
}

export interface UpdateFeedingInput {
  foodName?: string;
  frequency?: string;
  quantity?: string;
  time?: string;
  notes?: string;
}
