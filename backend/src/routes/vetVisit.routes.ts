import { Router } from "express";
import { VetVisitController } from "../controllers/VetVisitController";

const vetVisitRoutes = Router();
const controller = new VetVisitController();

vetVisitRoutes.get("/", (req, res) => controller.list(req, res));
vetVisitRoutes.post("/", (req, res) => controller.create(req, res));
vetVisitRoutes.put("/:id", (req, res) => controller.update(req, res));
vetVisitRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export { vetVisitRoutes };
