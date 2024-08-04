// services/recipeService.ts
import { RecipeCardProps } from '../components/SmallRecipeCard';

const API_BASE_URL = 'http://localhost:8080/api';

const getRecipe = async (id: string): Promise<RecipeCardProps> => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch recipe with ID ${id}:`, error);
    throw error;
  }
};

const fetchRecipes = async (offset: number, limit: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/recipes/public?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export default {
  getRecipe,
  fetchRecipes,
};

