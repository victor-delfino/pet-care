import { VetVisit, CreateVetVisitInput, UpdateVetVisitInput } from "../../domain/VetVisit";
import { VetVisitRepository } from "../../domain/VetVisitRepository";
import { prisma } from "../prisma/client";

export class PrismaVetVisitRepository implements VetVisitRepository {
  async create(data: CreateVetVisitInput): Promise<VetVisit> {
    const vetVisit = await prisma.vetVisit.create({
      data: {
        animalId: data.animalId,
        date: data.date,
        reason: data.reason,
        diagnosis: data.diagnosis ?? null,
        veterinarian: data.veterinarian ?? null,
        cost: data.cost ?? null,
        notes: data.notes ?? null,
      },
    });

    return vetVisit;
  }

  async findById(id: string): Promise<VetVisit | null> {
    const vetVisit = await prisma.vetVisit.findUnique({
      where: { id },
    });

    return vetVisit;
  }

  async findByAnimalId(animalId: string): Promise<VetVisit[]> {
    const vetVisits = await prisma.vetVisit.findMany({
      where: { animalId },
      orderBy: { date: "desc" },
    });

    return vetVisits;
  }

  async findAll(): Promise<VetVisit[]> {
    const vetVisits = await prisma.vetVisit.findMany({
      orderBy: { date: "desc" },
    });

    return vetVisits;
  }

  async update(id: string, data: UpdateVetVisitInput): Promise<VetVisit> {
    const vetVisit = await prisma.vetVisit.update({
      where: { id },
      data: {
        date: data.date,
        reason: data.reason,
        diagnosis: data.diagnosis,
        veterinarian: data.veterinarian,
        cost: data.cost,
        notes: data.notes,
      },
    });

    return vetVisit;
  }

  async delete(id: string): Promise<void> {
    await prisma.vetVisit.delete({
      where: { id },
    });
  }
}
