import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

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
    <aside
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 flex flex-col py-2 transition-width duration-300 ease-in-out overflow-hidden
        ${isOpen ? "w-60 px-6" : "w-0 px-0"}`}
      style={{ zIndex: 100 }}
    >
      <nav
        className={`flex-1 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-1 whitespace-nowrap mt-12">
          {" "}
          {/* add margin top so links don’t overlap toggle */}
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-muted dark:hover:bg-muted/30"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-6">
        <p className="text-sm ml-15 text-gray-500 dark:text-gray-400 mb-2">

          {user?.name}
        </p>
        <button
          onClick={confirmLogout}
          className="w-full px-3 py-2 text-sm rounded text-destructive hover:bg-destructive hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
