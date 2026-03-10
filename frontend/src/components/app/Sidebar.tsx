import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/app", label: "Dashboard", icon: "📊" },
  { path: "/app/animals", label: "Animals", icon: "🐾" },
  { path: "/app/vaccines", label: "Vaccines", icon: "💉" },
  { path: "/app/vet-visits", label: "Vet Visits", icon: "🩺" },
  { path: "/app/feeding", label: "Feeding", icon: "🍖" },
  { path: "/app/reminders", label: "Reminders", icon: "🔔" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-gray-800">
        <NavLink to="/" className="text-xl font-bold text-white tracking-tight">
          PetCare
        </NavLink>
        <p className="text-xs text-gray-500 mt-1">Management Platform</p>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            V
          </div>
          <div>
            <p className="text-sm text-white">Victor</p>
            <p className="text-xs text-gray-500">Pet Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
