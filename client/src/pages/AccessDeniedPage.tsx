// src/pages/AccessDeniedPage.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        You must be logged in to access this page.
      </p>
      <Link to="/">
        <Button variant="outline">Back to Login</Button>
      </Link>
    </div>
  );
}
