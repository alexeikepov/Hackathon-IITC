import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div
        className="relative w-full max-w-[1000px] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://www.israelhayom.co.il/wp-content/uploads/2022/02/15964650464111_b.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full max-w-[600px] bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-xl">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
