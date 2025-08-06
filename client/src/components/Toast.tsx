import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const icon = type === "success" ? "✔️" : "❌";

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center space-x-3 rounded-md px-5 py-3 text-white shadow-lg ${bgColor} animate-slide-in`}
      role="alert"
    >
      <span className="text-xl">{icon}</span>
      <p className="font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 transition"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
