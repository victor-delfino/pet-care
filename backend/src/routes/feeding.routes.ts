import { Router } from "express";
import { FeedingController } from "../controllers/FeedingController";

const feedingRoutes = Router();
const controller = new FeedingController();

feedingRoutes.get("/", (req, res) => controller.list(req, res));
feedingRoutes.post("/", (req, res) => controller.create(req, res));
feedingRoutes.put("/:id", (req, res) => controller.update(req, res));
feedingRoutes.delete("/:id", (req, res) => controller.delete(req, res));

export { feedingRoutes };
