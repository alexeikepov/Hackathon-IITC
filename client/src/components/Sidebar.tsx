import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

export function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

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
        {/* Header row with title + theme toggle */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-amber-500 tracking-tight select-none">
            LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
          </h1>
          <ModeToggle />
        </div>

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

      {/* Bottom section (only user + logout now) */}
      <div className="p-6 flex flex-col gap-4 border-t border-border">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.name}
        </span>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="w-full">
              Logout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out from your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmLogout}>
                Confirm Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  );
}
