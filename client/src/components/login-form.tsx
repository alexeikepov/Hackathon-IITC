import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      setAuth(data.user);
      navigate("/dashboard");
    },
    onError: () => {},
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            disabled={mutation.isPending}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={mutation.isPending}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {mutation.error && (
          <p className="text-sm text-red-500 text-center">
            {mutation.error.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
