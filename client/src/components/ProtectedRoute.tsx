import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
  redirectIfAuth = false,
}: {
  children: React.ReactNode;
  redirectIfAuth?: boolean;
}) {
  const { isAuth } = useAuth();

  if (redirectIfAuth && isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!redirectIfAuth && !isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
