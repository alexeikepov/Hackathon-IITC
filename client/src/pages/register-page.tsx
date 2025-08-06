import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#e0f7fa] to-[#e3f2fd] p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-500 mb-10 tracking-tight select-none">
            LMS<span className="text-gray-800 dark:text-gray-300">-HUB</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Let's get you started with a new account
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
