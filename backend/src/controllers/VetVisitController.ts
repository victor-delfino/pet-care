import { Request, Response } from "express";
import { PrismaVetVisitRepository } from "../infrastructure/repositories/PrismaVetVisitRepository";
import { CreateVetVisitUseCase } from "../application/use-cases/CreateVetVisitUseCase";
import { ListVetVisitsUseCase } from "../application/use-cases/ListVetVisitsUseCase";
import { UpdateVetVisitUseCase } from "../application/use-cases/UpdateVetVisitUseCase";
import { DeleteVetVisitUseCase } from "../application/use-cases/DeleteVetVisitUseCase";

export class VetVisitController {
  private readonly repository: PrismaVetVisitRepository;

  constructor() {
    this.repository = new PrismaVetVisitRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new CreateVetVisitUseCase(this.repository);
      const vetVisit = await useCase.execute(req.body);
      res.status(201).json(vetVisit);
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
      const useCase = new ListVetVisitsUseCase(this.repository);
      const vetVisits = await useCase.execute(animalId as string | undefined);
      res.status(200).json(vetVisits);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new UpdateVetVisitUseCase(this.repository);
      const vetVisit = await useCase.execute(id, req.body);
      res.status(200).json(vetVisit);
    } catch (error) {
      if (error instanceof Error && error.message === "Vet visit not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new DeleteVetVisitUseCase(this.repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Vet visit not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
