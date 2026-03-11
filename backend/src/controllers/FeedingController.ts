import { Request, Response } from "express";
import { PrismaFeedingRepository } from "../infrastructure/repositories/PrismaFeedingRepository";
import { CreateFeedingUseCase } from "../application/use-cases/CreateFeedingUseCase";
import { ListFeedingsUseCase } from "../application/use-cases/ListFeedingsUseCase";
import { UpdateFeedingUseCase } from "../application/use-cases/UpdateFeedingUseCase";
import { DeleteFeedingUseCase } from "../application/use-cases/DeleteFeedingUseCase";

export class FeedingController {
  private readonly repository: PrismaFeedingRepository;

  constructor() {
    this.repository = new PrismaFeedingRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new CreateFeedingUseCase(this.repository);
      const feeding = await useCase.execute(req.body);
      res.status(201).json(feeding);
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
      const useCase = new ListFeedingsUseCase(this.repository);
      const feedings = await useCase.execute(animalId as string | undefined);
      res.status(200).json(feedings);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new UpdateFeedingUseCase(this.repository);
      const feeding = await useCase.execute(id, req.body);
      res.status(200).json(feeding);
    } catch (error) {
      if (error instanceof Error && error.message === "Feeding not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new DeleteFeedingUseCase(this.repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Feeding not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
