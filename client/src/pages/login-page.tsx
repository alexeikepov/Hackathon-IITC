import { LoginForm } from "@/components/login-form";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1f2937] dark:via-[#111827] dark:to-[#1f2937] p-4">
      <div className="w-full max-w-[500px] rounded-2xl shadow-2xl bg-white/80 dark:bg-black/30 backdrop-blur-md p-6 sm:p-8 text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold text-amber-500 text-center mb-8 tracking-tight select-none">
          LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
