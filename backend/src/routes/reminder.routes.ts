import { Router } from "express";
import { ReminderController } from "../controllers/ReminderController";

const reminderRoutes = Router();
const controller = new ReminderController();

reminderRoutes.get("/", (req, res) => controller.list(req, res));
reminderRoutes.post("/", (req, res) => controller.create(req, res));
reminderRoutes.put("/:id", (req, res) => controller.update(req, res));
reminderRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export { reminderRoutes };
