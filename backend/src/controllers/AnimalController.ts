import { Request, Response } from "express";
import { PrismaAnimalRepository } from "../infrastructure/repositories/PrismaAnimalRepository";
import { CreateAnimalUseCase } from "../application/use-cases/CreateAnimalUseCase";
import { ListAnimalsUseCase } from "../application/use-cases/ListAnimalsUseCase";
import { UpdateAnimalUseCase } from "../application/use-cases/UpdateAnimalUseCase";
import { DeleteAnimalUseCase } from "../application/use-cases/DeleteAnimalUseCase";

export class AnimalController {
  private readonly repository: PrismaAnimalRepository;

  constructor() {
    this.repository = new PrismaAnimalRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const useCase = new CreateAnimalUseCase(this.repository);
      const animal = await useCase.execute(req.body);
      res.status(201).json(animal);
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
      const useCase = new ListAnimalsUseCase(this.repository);
      const animals = await useCase.execute();
      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new UpdateAnimalUseCase(this.repository);
      const animal = await useCase.execute(id, req.body);
      res.status(200).json(animal);
    } catch (error) {
      if (error instanceof Error && error.message === "Animal not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const useCase = new DeleteAnimalUseCase(this.repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Animal not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
