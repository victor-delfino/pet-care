import express from "express";
import { animalRoutes } from "../routes/animal.routes";
import { vaccineRoutes } from "../routes/vaccine.routes";
import { vetVisitRoutes } from "../routes/vetVisit.routes";
import { feedingRoutes } from "../routes/feeding.routes";
import { reminderRoutes } from "../routes/reminder.routes";

const app = express();

app.use(express.json());

app.use("/animals", animalRoutes);
app.use("/vaccines", vaccineRoutes);
app.use("/vet-visits", vetVisitRoutes);
app.use("/feedings", feedingRoutes);
app.use("/reminders", reminderRoutes);

export { app };
