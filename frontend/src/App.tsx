import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AppLayout } from "./pages/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { AnimalsPage } from "./pages/AnimalsPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route
            path="vaccines"
            element={
              <PlaceholderPage
                title="Vaccines"
                description="Track vaccination schedules and records"
                icon="💉"
              />
            }
          />
          <Route
            path="vet-visits"
            element={
              <PlaceholderPage
                title="Vet Visits"
                description="Manage veterinary consultation history"
                icon="🩺"
              />
            }
          />
          <Route
            path="feeding"
            element={
              <PlaceholderPage
                title="Feeding"
                description="Control nutrition and feeding schedules"
                icon="🍖"
              />
            }
          />
          <Route
            path="reminders"
            element={
              <PlaceholderPage
                title="Reminders"
                description="Set up care reminders and notifications"
                icon="🔔"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
