import { Reminder, CreateReminderInput, UpdateReminderInput } from "../../domain/Reminder";
import { ReminderRepository } from "../../domain/ReminderRepository";
import { prisma } from "../prisma/client";

export class PrismaReminderRepository implements ReminderRepository {
  async create(data: CreateReminderInput): Promise<Reminder> {
    const reminder = await prisma.reminder.create({
      data: {
        animalId: data.animalId,
        title: data.title,
        description: data.description ?? null,
        dueDate: data.dueDate,
      },
    });

    return reminder;
  }

  async findById(id: string): Promise<Reminder | null> {
    const reminder = await prisma.reminder.findUnique({
      where: { id },
    });

    return reminder;
  }

  async findByAnimalId(animalId: string): Promise<Reminder[]> {
    const reminders = await prisma.reminder.findMany({
      where: { animalId },
      orderBy: { dueDate: "asc" },
    });

    return reminders;
  }

  async findAll(): Promise<Reminder[]> {
    const reminders = await prisma.reminder.findMany({
      orderBy: { dueDate: "asc" },
    });

    return reminders;
  }

  async update(id: string, data: UpdateReminderInput): Promise<Reminder> {
    const reminder = await prisma.reminder.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        completed: data.completed,
      },
    });

    return reminder;
  }

  async delete(id: string): Promise<void> {
    await prisma.reminder.delete({
      where: { id },
    });
  }
}
