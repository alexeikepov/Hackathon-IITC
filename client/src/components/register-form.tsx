import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { NameInput } from "@/RegisterInputs/NameInput";
import { EmailInput } from "@/RegisterInputs/EmailInput";
import { PasswordInput } from "@/RegisterInputs/PasswordInput";

const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      setAuth(data.user);
      navigate("/");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col relative z-10 w-full max-w-[600px] bg-white/80 dark:bg-slate-900/70 backdrop-blur-lg p-6 sm:p-8 rounded-xl gap-5 shadow-xl",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-extrabold text-orange-500 dark:text-orange-400">
            Register
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create a new account
          </p>
        </div>

        <div className="grid gap-5">
          <NameInput />
          <EmailInput />
          <PasswordInput />

          {mutation.error && (
            <p className="text-sm text-red-500 text-center">
              {mutation.error.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
