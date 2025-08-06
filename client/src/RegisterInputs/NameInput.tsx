import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";

export function NameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-2">
      <Label htmlFor="name">Full Name</Label>
      <Input
        id="name"
        placeholder="Name Surname"
        type="text"
        {...register("name")}
      />
      <FormError message={errors.name?.message?.toString()} />
    </div>
  );
}
