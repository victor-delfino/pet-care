import { Request, Response } from "express";
import { PrismaReminderRepository } from "../infrastructure/repositories/PrismaReminderRepository";
import { CreateReminderUseCase } from "../application/use-cases/CreateReminderUseCase";
import { ListRemindersUseCase } from "../application/use-cases/ListRemindersUseCase";
import { UpdateReminderUseCase } from "../application/use-cases/UpdateReminderUseCase";
import { DeleteReminderUseCase } from "../application/use-cases/DeleteReminderUseCase";

export class ReminderController {
  private readonly repository: PrismaReminderRepository;

  constructor() {
    this.repository = new PrismaReminderRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new CreateReminderUseCase(this.repository);
      const reminder = await useCase.execute(req.body);
      res.status(201).json(reminder);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.query;
      const useCase = new ListRemindersUseCase(this.repository);
      const reminders = await useCase.execute(animalId as string | undefined);
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new UpdateReminderUseCase(this.repository);
      const reminder = await useCase.execute(id, req.body);
      res.status(200).json(reminder);
    } catch (error) {
      if (error instanceof Error && error.message === "Reminder not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new DeleteReminderUseCase(this.repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Reminder not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
