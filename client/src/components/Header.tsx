import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "@/api/auth/AuthDialog";
import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuth, user, logout } = useAuth();

  const navItemsAuth = [
    { label: "Recipes", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Add Recipe", path: "/add" },
    { label: "Contact US", path: "/contact-as" },
  ];

  const navItemsGuest = [
    { label: "Recipes", path: "/" },
    { label: "Contact US", path: "/contact-as" },
    { label: "About US", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[hsl(240,27%,14%)] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 hover:text-green-700 transition"
        >
          RecipeHub
        </Link>

        <nav className="hidden md:flex gap-6">
          {(isAuth ? navItemsAuth : navItemsGuest).map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-green-500 underline"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {isAuth ? (
            <>
              <Button variant="ghost" size="sm">
                {user?.name}
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <AuthDialog />
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-[#2a2a3d] border-t border-gray-200 dark:border-gray-700 transition-colors"
        >
          {(isAuth ? navItemsAuth : navItemsGuest).map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium transition ${
                  isActive
                    ? "text-green-500 underline"
                    : "text-gray-700 dark:text-gray-300 hover:text-green-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t mt-2 flex flex-col gap-2">
            <ModeToggle />
            {isAuth ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <AuthDialog />
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
