import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function ConfirmPasswordInput() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = useState(false);
  const password = watch("password");

  return (
    <div className="grid gap-2">
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <div className="relative">
        <Input
          id="confirmPassword"
          placeholder="••••••••"
          type={show ? "text" : "password"}
          {...register("confirmPassword", {
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <FormError message={errors.confirmPassword?.message?.toString()} />
    </div>
  );
}
