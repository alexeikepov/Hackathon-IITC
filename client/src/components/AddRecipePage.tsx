import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import api from "../api";

const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  preparationTime: z.string().nonempty("Preparation time is required"),
  category: z.string().nonempty("Category is required"),
  instructions: z
    .string()
    .min(10, "Instructions must be at least 10 characters"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const preparationTimeMap: Record<string, 1 | 2 | 3 | 4> = {
  "Under 15 minutes": 1,
  "15-30 minutes": 2,
  "30-60 minutes": 3,
  "Over 1 hour": 4,
};

export function AddRecipePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  const [category, setCategory] = useState("");

  useEffect(() => {
    setValue("ingredients", ingredientsList);
  }, [ingredientsList, setValue]);

  useEffect(() => {
    setValue("category", category);
  }, [category, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: RecipeFormData) => {
      const postData = {
        imgSrc: data.imageUrl,
        title: data.title,
        description: data.description,
        ingredients: ingredientsList,
        preparationTime: preparationTimeMap[data.preparationTime],
        category: category.toLowerCase(),
        instructions: data.instructions,
      };
      const response = await api.post("/api/recipes", postData, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const onSubmit = (data: RecipeFormData) => {
    if (ingredientsList.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        alert("Recipe added successfully!");
        reset();
        setIngredientsList([]);
        setCategory("");
      },
      onError: (error: any) => {
        const msg = error?.response?.data?.message || "Error adding recipe";
        alert(msg);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow-md transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Add New Recipe
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.title && (
            <p className="text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* image url */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            {...register("imageUrl")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.imageUrl && (
            <p className="text-red-600 mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          />
          {errors.description && (
            <p className="text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* ingredients */}
        <div>
          <label
            htmlFor="ingredientsInput"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Ingredients
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              id="ingredientsInput"
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (currentIngredient.trim() !== "") {
                    setIngredientsList((prev) => [
                      ...prev,
                      currentIngredient.trim(),
                    ]);
                    setCurrentIngredient("");
                  }
                }
              }}
              className="flex-grow border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Type an ingredient and press Enter or Add"
            />
            <button
              type="button"
              onClick={() => {
                if (currentIngredient.trim() !== "") {
                  setIngredientsList((prev) => [
                    ...prev,
                    currentIngredient.trim(),
                  ]);
                  setCurrentIngredient("");
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>
          {ingredientsList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {ingredientsList.map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
          {errors.ingredients && (
            <p className="text-red-600 mt-1">{errors.ingredients.message}</p>
          )}
        </div>

        {/* category selection */}
        <div>
          <label
            htmlFor="category"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Select category</option>
            <option value="kosher">Kosher</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="meat-based">Meat-Based</option>
            <option value="gluten-free">Gluten Free</option>
          </select>
        </div>

        {/* preparationTime */}
        <div>
          <label
            htmlFor="preparationTime"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Preparation Time
          </label>
          <select
            id="preparationTime"
            {...register("preparationTime")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Select time</option>
            <option value="Under 15 minutes">Under 15 minutes</option>
            <option value="15-30 minutes">15-30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="Over 1 hour">Over 1 hour</option>
          </select>
          {errors.preparationTime && (
            <p className="text-red-600 mt-1">
              {errors.preparationTime.message}
            </p>
          )}
        </div>

        {/* instructions */}
        <div>
          <label
            htmlFor="instructions"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            {...register("instructions")}
            rows={6}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          />
          {errors.instructions && (
            <p className="text-red-600 mt-1">{errors.instructions.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-3 text-white font-semibold rounded transition ${
            mutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          }`}
        >
          {mutation.isPending ? "Saving..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}
