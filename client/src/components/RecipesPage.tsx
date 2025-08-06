import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FilterSidebar } from "./FilterSidebar";
import { Menu, X } from "lucide-react";

type Recipe = {
  _id: string;
  title: string;
  imgSrc: string;
  preparationTime: number;
  category: string;
};

type FilterState = {
  time: string[];
  type: string[];
};

export function RecipesPage() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    time: [],
    type: [],
  });

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/recipes");
        setRecipes(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const filtered = recipes.filter((recipe) => {
    const timeMatches =
      filters.time.length === 0 ||
      filters.time.some((timeRange) => {
        if (timeRange === "Under 15 minutes")
          return recipe.preparationTime < 15;
        if (timeRange === "15–30 minutes")
          return recipe.preparationTime >= 15 && recipe.preparationTime <= 30;
        if (timeRange === "30–60 minutes")
          return recipe.preparationTime > 30 && recipe.preparationTime <= 60;
        if (timeRange === "Over 1 hour") return recipe.preparationTime > 60;
        return false;
      });

    const typeMatches =
      filters.type.length === 0 || filters.type.includes(recipe.category);

    return timeMatches && typeMatches;
  });

  return (
    <div>
      {/* Кнопка открытия фильтра */}
      <button
        aria-label={
          isFilterOpen ? "Close filter sidebar" : "Open filter sidebar"
        }
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="fixed top-20 left-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 text-green-600 hover:text-green-800 border border-green-600 hover:border-green-800 rounded-md px-3 py-2 shadow-md cursor-pointer transition-colors"
      >
        {isFilterOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
        Filters
      </button>

      {/* Сайдбар фильтра (фиксирован поверх контента, без оверлея) */}
      {isFilterOpen && (
        <div className="fixed top-24 left-4 z-50 h-[calc(100vh-6rem)] w-64 bg-white dark:bg-gray-900 rounded-md shadow-lg p-4 overflow-auto">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      )}

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-extrabold text-green-700 mb-12">
          Delicious Recipes
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>No recipes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((recipe) => (
              <div
                key={recipe._id}
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => navigate(`/recipe/${recipe._id}`)}
              >
                <img
                  src={recipe.imgSrc}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <h2 className="text-white text-xl font-semibold">
                    {recipe.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
