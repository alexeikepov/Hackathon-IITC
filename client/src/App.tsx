import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SchedulePage } from "./components/SchedulePage";
import { SyllabusPage } from "./components/SyllabusPage";
import LoginPage from "./pages/auth-page";
import RegisterPage from "./pages/register-page";
import { AppLayout } from "./components/AppLayout";
import { CreateCoursePage } from "./pages/CreateCoursePage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();

  const isAuthPage = ["/", "/register"].includes(location.pathname);

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      ) : (
        <ProtectedRoute>
          <AppLayout>
            <Routes>
              <Route path="/dashboard" />
              <Route path="/syllabus" element={<SyllabusPage />} />
              <Route path="/SchedulePage" element={<SchedulePage />} />
              <Route path="/create-course" element={<CreateCoursePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </ProtectedRoute>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
