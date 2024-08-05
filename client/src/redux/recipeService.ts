// services/recipeService.ts
import { RecipeCardProps } from '../types/RecipeCardProps';
import { Filters } from '../types/Filters';

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

export const fetchRecipes = async (offset: number, limit: number, filters: Filters): Promise<RecipeCardProps[]> => {
  try {
    const query = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      type: filters.type,
      price: filters.price?.toString() || '',
      kitchen: filters.kitchen,
      cookingTime: filters.cookingTime.toString(),
      options: filters.options.join(','),
      difficulty: filters.difficulty.join(','),
    });

    const response = await fetch(`http://localhost:8080/api/recipes/public?${query}`);
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
};

