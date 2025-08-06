import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";

export function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" {...register("password")} />
      <FormError message={errors.name?.message?.toString()} />
    </div>
  );
}
