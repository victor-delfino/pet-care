import { Feeding, CreateFeedingInput, UpdateFeedingInput } from "../../domain/Feeding";
import { FeedingRepository } from "../../domain/FeedingRepository";
import { prisma } from "../prisma/client";

export class PrismaFeedingRepository implements FeedingRepository {
  async create(data: CreateFeedingInput): Promise<Feeding> {
    const feeding = await prisma.feeding.create({
      data: {
        animalId: data.animalId,
        foodName: data.foodName,
        frequency: data.frequency,
        quantity: data.quantity ?? null,
        time: data.time ?? null,
        notes: data.notes ?? null,
      },
    });

    return feeding;
  }

  async findById(id: string): Promise<Feeding | null> {
    const feeding = await prisma.feeding.findUnique({
      where: { id },
    });

    return feeding;
  }

  async findByAnimalId(animalId: string): Promise<Feeding[]> {
    const feedings = await prisma.feeding.findMany({
      where: { animalId },
      orderBy: { createdAt: "desc" },
    });

    return feedings;
  }

  async findAll(): Promise<Feeding[]> {
    const feedings = await prisma.feeding.findMany({
      orderBy: { createdAt: "desc" },
    });

    return feedings;
  }

  async update(id: string, data: UpdateFeedingInput): Promise<Feeding> {
    const feeding = await prisma.feeding.update({
      where: { id },
      data: {
        foodName: data.foodName,
        frequency: data.frequency,
        quantity: data.quantity,
        time: data.time,
        notes: data.notes,
      },
    });

    return feeding;
  }

  async delete(id: string): Promise<void> {
    await prisma.feeding.delete({
      where: { id },
    });
  }
}
