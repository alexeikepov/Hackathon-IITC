// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { AccessDeniedPage } from "@/pages/AccessDeniedPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <AccessDeniedPage />;
  }

  return <>{children}</>;
}
