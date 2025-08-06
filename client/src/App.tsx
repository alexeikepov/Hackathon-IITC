import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { RecipesPage } from "./components/RecipesPage";
import { Footer } from "./components/Footer";
import { RecipeDetailPage } from "./components/RecipeDetailPage";
import { AddRecipePage } from "./components/AddRecipePage";
import { FavoritesPage } from "./components/FavoritesPage";
import { AuthProvider } from "@/context/AuthContext";
import { ContactUSPage } from "./components/ContactUSPage";
import { AboutUsPage } from "./components/AboutUsPage";
import { ThemeProvider } from "./context/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
                <Routes>
                  <Route path="/" element={<RecipesPage />} />
                  <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                  <Route path="/add" element={<AddRecipePage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/contact-as" element={<ContactUSPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
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
