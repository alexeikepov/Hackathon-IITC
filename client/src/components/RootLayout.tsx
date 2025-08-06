import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { WelcomeUser } from "./WelcomeUser";
import { NavLink } from "react-router-dom";

export function RootLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Create Course", path: "/create-course" },
    { label: "Syllabus", path: "/syllabus" },
    { label: "Schedule", path: "/schedule-page" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
        <h1 className="text-2xl font-bold text-amber-500 tracking-tight select-none">
          LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
        </h1>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <WelcomeUser />
        </div>
      </header>

      {/* Menu button + collapsible nav */}
      <div className="px-6 py-2 border-b border-border bg-background">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-sm border rounded hover:bg-accent transition"
        >
          {isOpen ? "<<" : ">>"} Menu
        </button>

        {isOpen && (
          <nav className="mt-3 flex flex-col gap-2 bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 p-3 rounded-md shadow-md">
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
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
