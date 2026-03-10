import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/app/Sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
