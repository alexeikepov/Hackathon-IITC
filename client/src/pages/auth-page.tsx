import { LoginForm } from "@/components/login-form";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-[#1f2937] dark:via-[#111827] dark:to-[#1f2937] p-4">
      <div className="relative w-full max-w-[900px] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white/60 dark:bg-black/30 backdrop-blur-md flex flex-col items-center justify-start pt-12 px-6 sm:px-10">
        <h1 className="text-4xl font-bold text-amber-500 tracking-tight select-none text-center mb-8">
          LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
        </h1>

        <div className="w-full max-w-[600px]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
