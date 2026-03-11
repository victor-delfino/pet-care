import { Router } from "express";
import { VaccineController } from "../controllers/VaccineController";

const vaccineRoutes = Router();
const controller = new VaccineController();

vaccineRoutes.get("/", (req, res) => controller.list(req, res));
vaccineRoutes.post("/", (req, res) => controller.create(req, res));
vaccineRoutes.put("/:id", (req, res) => controller.update(req, res));
vaccineRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export { vaccineRoutes };
