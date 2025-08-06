import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/ModeToggle";
import { useState, useRef } from "react";

export function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Create Course", path: "/create-course" },
    { label: "Syllabus", path: "/syllabus" },
    { label: "Schedule", path: "/schedule-page" },
  ];

  const confirmLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside className="relative w-64 h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 border-r border-border flex flex-col p-6">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 relative"
        ref={containerRef}
      >
        <h1 className="text-3xl font-bold text-amber-500 tracking-tight select-none">
          LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
        </h1>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-1 rounded border border-border text-gray-700 dark:text-gray-300 hover:bg-muted dark:hover:bg-muted/30 transition select-none"
          >
            {isOpen ? "×" : "»"}
          </button>
        </div>

        {/* Nav sliding horizontally below the button */}
        <nav
          className={`absolute top-full left-0 mt-2 flex gap-3 bg-white dark:bg-slate-800 border border-border rounded-md shadow-md p-3 z-50
            origin-left transform transition-transform duration-300 ease-out
            ${isOpen ? "scale-x-100" : "scale-x-0"}`}
          style={{
            transformOrigin: "left",
            whiteSpace: "nowrap",
            height: "3rem",
          }}
        >
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
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User info and logout */}
      <div className="mt-auto pt-6 border-t border-border">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {user?.name}
        </p>
        <button
          onClick={confirmLogout}
          className="w-full px-3 py-2 text-sm rounded border border-destructive text-destructive hover:bg-destructive hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
