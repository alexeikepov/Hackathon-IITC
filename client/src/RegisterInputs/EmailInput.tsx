import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";

export function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        placeholder="you@example.com"
        type="email"
        {...register("email")}
      />
      <FormError message={errors.email?.message?.toString()} />
    </div>
  );
}
