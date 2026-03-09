import express from "express";
import { animalRoutes } from "../routes/animal.routes";

const app = express();

app.use(express.json());

app.use("/animals", animalRoutes);

export { app };
