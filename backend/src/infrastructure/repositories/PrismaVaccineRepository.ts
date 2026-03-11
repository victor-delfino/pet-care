import { Vaccine, CreateVaccineInput, UpdateVaccineInput } from "../../domain/Vaccine";
import { VaccineRepository } from "../../domain/VaccineRepository";
import { prisma } from "../prisma/client";

export class PrismaVaccineRepository implements VaccineRepository {
  async create(data: CreateVaccineInput): Promise<Vaccine> {
    const vaccine = await prisma.vaccine.create({
      data: {
        animalId: data.animalId,
        name: data.name,
        appliedAt: data.appliedAt,
        nextDoseAt: data.nextDoseAt ?? null,
        veterinarian: data.veterinarian ?? null,
        notes: data.notes ?? null,
      },
    });

    return vaccine;
  }

  async findById(id: string): Promise<Vaccine | null> {
    const vaccine = await prisma.vaccine.findUnique({
      where: { id },
    });

    return vaccine;
  }

  async findByAnimalId(animalId: string): Promise<Vaccine[]> {
    const vaccines = await prisma.vaccine.findMany({
      where: { animalId },
      orderBy: { appliedAt: "desc" },
    });

    return vaccines;
  }

  async findAll(): Promise<Vaccine[]> {
    const vaccines = await prisma.vaccine.findMany({
      orderBy: { appliedAt: "desc" },
    });

    return vaccines;
  }

  async update(id: string, data: UpdateVaccineInput): Promise<Vaccine> {
    const vaccine = await prisma.vaccine.update({
      where: { id },
      data: {
        name: data.name,
        appliedAt: data.appliedAt,
        nextDoseAt: data.nextDoseAt,
        veterinarian: data.veterinarian,
        notes: data.notes,
      },
    });

    return vaccine;
  }

  async delete(id: string): Promise<void> {
    await prisma.vaccine.delete({
      where: { id },
    });
  }
}
