import { Footer } from "./Footer";
import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ModeToggle } from "./ModeToggle";
import { WelcomeUser } from "./WelcomeUser";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function RootLayout() {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center p-4 border-b border-border">
        <Link to="/">
          <h1 className="text-3xl font-bold ml-12 text-amber-500 tracking-tight select-none leading-none hover:underline">
            LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
          </h1>
        </Link>
        <button
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-[1000] w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center select-none hover:bg-muted dark:hover:bg-muted/30 transition"
        >
          {isSidebarOpen ? "×" : "»"}
        </button>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <WelcomeUser onLogout={onLogout} />
        </div>
      </header>

      <div
        className="flex flex-1 transition-margin duration-300 ease-in-out"
        style={{ marginLeft: isSidebarOpen ? 240 : 0 }}
      >
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
