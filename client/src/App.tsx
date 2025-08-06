import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SchedulePage } from "./components/SchedulePage";
import { SyllabusPage } from "./components/SyllabusPage";
import LoginPage from "./pages/auth-page";
import RegisterPage from "./pages/register-page";
import { AppLayout } from "./components/AppLayout";

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
        <AppLayout>
          <Routes>
            <Route path="/syllabus" element={<SyllabusPage />} />
          </Routes>
          <Routes>
            <Route path="/SchedulePage" element={<SchedulePage />} />
          </Routes>
        </AppLayout>
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
