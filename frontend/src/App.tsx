import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AppLayout } from "./pages/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { AnimalsPage } from "./pages/AnimalsPage";
import { VaccinesPage } from "./pages/VaccinesPage";
import { VetVisitsPage } from "./pages/VetVisitsPage";
import { FeedingsPage } from "./pages/FeedingsPage";
import { RemindersPage } from "./pages/RemindersPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="vaccines" element={<VaccinesPage />} />
          <Route path="vet-visits" element={<VetVisitsPage />} />
          <Route path="feeding" element={<Navigate to="/app/feedings" replace />} />
          <Route path="feedings" element={<FeedingsPage />} />
          <Route path="reminders" element={<RemindersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
