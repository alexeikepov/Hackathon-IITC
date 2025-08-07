import { RegisterForm } from "@/components/register-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/404");
      return;
    }

    const checkToken = async () => {
      try {
        const tokenResponse = await axios.get(
          `http://localhost:3001/api/auth/showRegister?token=${token}`
        );
        console.log(tokenResponse);
        setValid(true);
      } catch (err) {
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [token]);

  if (loading) return <p>Checking token...</p>;
  if (!valid) return null;
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f0f4ff] via-[#e0f7fa] to-[#e3f2fd] dark:from-[#1f2937] dark:via-[#111827] dark:to-[#1f2937]">
      <div className="w-full max-w-md space-y-8 bg-white/80 dark:bg-black/30 backdrop-blur-md rounded-2xl shadow-xl p-8 text-gray-800 dark:text-gray-100">
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
