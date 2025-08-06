import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
};

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    imageUrl:
      "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-jumbo-v2.jpg",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g pecorino cheese",
      "50g parmesan",
      "Freshly ground black pepper",
      "Salt",
    ],
    instructions: [
      "Cook spaghetti in salted boiling water.",
      "Fry pancetta until crispy.",
      "Beat eggs with cheese and pepper.",
      "Drain spaghetti and mix with pancetta and egg mixture off the heat.",
      "Serve immediately with extra cheese.",
    ],
  },
  {
    id: "2",
    title: "Chicken Salad",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      "200g cooked chicken breast",
      "Mixed salad greens",
      "Cherry tomatoes",
      "Cucumber slices",
      "Olive oil",
      "Lemon juice",
      "Salt and pepper",
    ],
    instructions: [
      "Chop chicken and vegetables.",
      "Mix olive oil, lemon juice, salt, and pepper to make dressing.",
      "Toss salad greens, tomatoes, cucumber and chicken with dressing.",
      "Serve chilled.",
    ],
  },
  {
    id: "3",
    title: "Beef Stroganoff",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      "500g beef strips",
      "1 onion",
      "200g mushrooms",
      "150ml sour cream",
      "2 tbsp flour",
      "Salt and pepper",
      "Butter",
    ],
    instructions: [
      "Sauté onions and mushrooms in butter.",
      "Add beef strips and cook until browned.",
      "Sprinkle flour and stir.",
      "Add sour cream, salt, and pepper.",
      "Simmer for 10 minutes and serve.",
    ],
  },
  {
    id: "4",
    title: "Vegetable Stir Fry",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      "Broccoli florets",
      "Sliced bell peppers",
      "Carrots",
      "Snow peas",
      "Soy sauce",
      "Garlic",
      "Ginger",
      "Vegetable oil",
    ],
    instructions: [
      "Heat oil in wok.",
      "Add garlic and ginger, sauté briefly.",
      "Add vegetables and stir fry on high heat.",
      "Add soy sauce and cook for 2 more minutes.",
      "Serve hot with rice or noodles.",
    ],
  },
  {
    id: "5",
    title: "Fish Tacos",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      "White fish fillets",
      "Taco shells",
      "Cabbage slaw",
      "Sour cream",
      "Lime juice",
      "Cilantro",
      "Spices (cumin, paprika)",
    ],
    instructions: [
      "Season fish with spices and grill.",
      "Warm taco shells.",
      "Assemble tacos with fish, slaw, sour cream, lime juice, and cilantro.",
      "Serve immediately.",
    ],
  },
  {
    id: "6",
    title: "Pancakes",
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      "1 cup flour",
      "1 cup milk",
      "1 egg",
      "2 tbsp sugar",
      "1 tsp baking powder",
      "Butter for frying",
      "Maple syrup",
    ],
    instructions: [
      "Mix flour, sugar, and baking powder.",
      "Whisk milk and egg separately, then combine with dry ingredients.",
      "Cook pancakes on a hot griddle with butter.",
      "Serve with maple syrup.",
    ],
  },
  {
    id: "7",
    title: "Caesar Salad",
    imageUrl:
      "https://www.maggi.co.uk/sites/default/files/srh_recipes/3ee1954a36009dd59be2d362a2a44cf6.jpg",
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Parmesan cheese",
      "Caesar dressing",
      "Lemon juice",
      "Anchovies (optional)",
    ],
    instructions: [
      "Toss lettuce with dressing and lemon juice.",
      "Top with croutons and parmesan.",
      "Add anchovies if desired.",
      "Serve chilled.",
    ],
  },
  {
    id: "8",
    title: "Tomato Soup",
    imageUrl:
      "https://www.onceuponachef.com/images/2021/02/Tomato-Soup-3-1200x1800.jpg",
    ingredients: [
      "4 cups tomatoes",
      "1 onion",
      "2 cloves garlic",
      "2 cups vegetable broth",
      "Salt and pepper",
      "Basil leaves",
      "Cream (optional)",
    ],
    instructions: [
      "Sauté onion and garlic.",
      "Add tomatoes and broth, simmer for 20 minutes.",
      "Blend until smooth.",
      "Season with salt, pepper and basil.",
      "Add cream if desired and serve hot.",
    ],
  },
];

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { isAuth } = useAuth();

  useEffect(() => {
    const found = recipes.find((r) => r.id === id);
    if (found) {
      setRecipe(found);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  if (!recipe) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const handleDelete = () => {
    alert("Recipe deleted (not really, just a placeholder)");
    navigate("/");
  };

  const handleEdit = () => {
    alert("Edit clicked (placeholder)");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-green-600 hover:underline"
      >
        &larr; Back to Recipes
      </button>

      <div className="relative mb-6">
        {isAuth && (
          <div className="absolute -top-14 right-0 flex gap-3">
            <button
              onClick={handleEdit}
              type="button"
              className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="inline-flex items-center px-4 py-2 rounded-md border border-red-400 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            >
              Delete
            </button>
          </div>
        )}

        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full rounded-lg shadow-lg object-cover max-h-96 mx-auto"
          loading="lazy"
        />
      </div>

      <h1 className="text-4xl font-bold mb-6 text-center">{recipe.title}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-lg">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3 text-lg">
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
