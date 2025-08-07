// src/components/Footer.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export function Footer() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light" || theme === "system") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <footer className="border-t border-border px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm font-semibold text-foreground">
            the DAD of IITC — Empowering Teachers
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LMS-HUB. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6 text-xs text-muted-foreground items-center">
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a
            href="/support"
            className="hover:text-foreground transition-colors"
          >
            Support
          </a>

          <button
            onClick={toggleTheme}
            className="px-2 py-1 border rounded hover:bg-accent transition flex items-center gap-2"
            aria-label="Toggle theme"
            title={`Switch to ${
              theme === "light" || theme === "system" ? "dark" : "light"
            } mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </footer>
  );
}
