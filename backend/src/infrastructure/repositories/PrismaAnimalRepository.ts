import { Animal, CreateAnimalInput, UpdateAnimalInput } from "../../domain/Animal";
import { AnimalRepository } from "../../domain/AnimalRepository";
import { prisma } from "../prisma/client";

export class PrismaAnimalRepository implements AnimalRepository {
  async create(data: CreateAnimalInput): Promise<Animal> {
    const animal = await prisma.animal.create({
      data: {
        name: data.name,
        species: data.species,
        breed: data.breed ?? null,
        birthDate: data.birthDate ?? null,
        weight: data.weight ?? null,
      },
    });

    return animal;
  }

  async findById(id: string): Promise<Animal | null> {
    const animal = await prisma.animal.findUnique({
      where: { id },
    });

    return animal;
  }

  async findAll(): Promise<Animal[]> {
    const animals = await prisma.animal.findMany({
      orderBy: { createdAt: "desc" },
    });

    return animals;
  }

  async update(id: string, data: UpdateAnimalInput): Promise<Animal> {
    const animal = await prisma.animal.update({
      where: { id },
      data: {
        name: data.name,
        species: data.species,
        breed: data.breed,
        birthDate: data.birthDate,
        weight: data.weight,
      },
    });

    return animal;
  }

  async delete(id: string): Promise<void> {
    await prisma.animal.delete({
      where: { id },
    });
  }
}
