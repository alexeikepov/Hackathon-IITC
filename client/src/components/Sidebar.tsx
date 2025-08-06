import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react";
import { WelcomeUser } from "@/components/WelcomeUser"; // ✅ import

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [, setDialogOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Create Course", path: "/create-course" },
    // { label: "Messages", path: "/messages" },
    { label: "Syllabus", path: "/syllabus" },
    { label: "Schedule", path: "/schedule-page" }, // ✅ Added Schedule
  ];

  const confirmLogout = async () => {
    await logout();
    navigate("/");
    setDialogOpen(false);
  };

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between border-r border-border bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-amber-500 tracking-tight select-none">
            LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
          </h1>
          <ModeToggle />
        </div>

        {/* ✅ Welcome user */}
        <WelcomeUser onLogout={confirmLogout} />

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-muted dark:hover:bg-muted/30"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom (optional: keep logout here too, or remove since it's inside WelcomeUser) */}
    </aside>
  );
}
