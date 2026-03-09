export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  birthDate: Date | null;
  weight: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnimalInput {
  name: string;
  species: string;
  breed?: string;
  birthDate?: Date;
  weight?: number;
}

export interface UpdateAnimalInput {
  name?: string;
  species?: string;
  breed?: string;
  birthDate?: Date;
  weight?: number;
}
