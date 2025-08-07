import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
    <>
      <aside
        className={`fixed top-0 left-0 h-screen backdrop-blur-md bg-white/70 dark:bg-black/30 flex flex-col py-2 transition-width duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-50 px-6" : "w-0 px-0"}`}
        style={{ zIndex: 100 }}
      >
        <nav
          className={`flex-1 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-1 whitespace-nowrap mt-16">
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

        <div className="mt-auto pt-6 pb-4">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
            {user?.name}
          </p>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full px-3 py-2 text-sm rounded text-destructive hover:bg-destructive hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-300">
              This will end your current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-muted hover:bg-muted/80 dark:bg-zinc-700 dark:hover:bg-zinc-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
            >
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
