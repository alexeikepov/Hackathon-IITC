import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { AuthProvider } from "@/context/AuthContext";

import { ThemeProvider } from "./context/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/auth-page";
import { RegisterForm } from "./components/register-form";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="flex flex-col h-screen bg-gradient-to-br from-[hsl(223,100%,90%)] via-[#e3f2fd] to-[hsl(228,71%,90%)]">
              <Header />
              <main className="flex-grow flex items-center justify-center overflow-hidden">
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterForm />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
