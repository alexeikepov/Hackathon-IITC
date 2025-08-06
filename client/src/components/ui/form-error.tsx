import { AlertCircle } from "lucide-react";

type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 mt-1">
      <AlertCircle className="w-4 h-4 shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
