import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
