export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  birthDate: string | null;
  weight: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnimalInput {
  name: string;
  species: string;
  breed?: string;
  birthDate?: string;
  weight?: number;
}

export interface UpdateAnimalInput {
  name?: string;
  species?: string;
  breed?: string;
  birthDate?: string;
  weight?: number;
}
