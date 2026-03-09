import { Router } from "express";
import { AnimalController } from "../controllers/AnimalController";

const animalRoutes = Router();
const controller = new AnimalController();

animalRoutes.get("/", (req, res) => controller.list(req, res));
animalRoutes.post("/", (req, res) => controller.create(req, res));
animalRoutes.put("/:id", (req, res) => controller.update(req, res));
animalRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export { animalRoutes };
