import { Request, Response } from "express";
import { PrismaVaccineRepository } from "../infrastructure/repositories/PrismaVaccineRepository";
import { CreateVaccineUseCase } from "../application/use-cases/CreateVaccineUseCase";
import { ListVaccinesUseCase } from "../application/use-cases/ListVaccinesUseCase";
import { UpdateVaccineUseCase } from "../application/use-cases/UpdateVaccineUseCase";
import { DeleteVaccineUseCase } from "../application/use-cases/DeleteVaccineUseCase";

export class VaccineController {
  private readonly repository: PrismaVaccineRepository;

  constructor() {
    this.repository = new PrismaVaccineRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new CreateVaccineUseCase(this.repository);
      const vaccine = await useCase.execute(req.body);
      res.status(201).json(vaccine);
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
      const useCase = new ListVaccinesUseCase(this.repository);
      const vaccines = await useCase.execute(animalId as string | undefined);
      res.status(200).json(vaccines);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new UpdateVaccineUseCase(this.repository);
      const vaccine = await useCase.execute(id, req.body);
      res.status(200).json(vaccine);
    } catch (error) {
      if (error instanceof Error && error.message === "Vaccine not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new DeleteVaccineUseCase(this.repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Vaccine not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
