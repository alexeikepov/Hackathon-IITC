import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SchedulePage } from "./components/SchedulePage";
import { SyllabusPage } from "./components/SyllabusPage";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import { AppLayout } from "./components/AppLayout";
import { CreateCoursePage } from "./pages/CreateCoursePage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute redirectIfAuth>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute redirectIfAuth>
            <RegisterPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/dashboard" element={<div>Dashboard</div>} />
                <Route path="/syllabus" element={<SyllabusPage />} />
                <Route path="/SchedulePage" element={<SchedulePage />} />
                <Route path="/create-course" element={<CreateCoursePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
