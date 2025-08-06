import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { logout, user } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Courses", path: "/courses" },
    { label: "Create Course", path: "/create-course" },
    { label: "Messages", path: "/messages" },
    { label: "Syllabus", path: "/syllabus" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#111827] shadow-lg h-screen sticky top-0 flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">LMS-HUB</h1>
        <nav className="flex flex-col gap-4">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <ModeToggle />
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user?.name}
        </div>
        <Button size="sm" variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </aside>
  );
}
