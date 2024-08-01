export interface RecipeCardProps {
    id: string;
    title: string;
    // Add other properties as needed
  }
  
  export interface MealPlan {
    day: string;
    meals: (string | RecipeCardProps)[];
    nutrition: { carbs: number; protein: number; calories: number };
  }
  
  export interface AlimentaryPlan {
    name: string;
    isShared: boolean;
    cards: {
      day: number;
      lines: (string | RecipeCardProps)[];
    }[];
  }
  
  const API_URL = '/api/alimentaryPlans';
  
  const getAuthToken = () => {
    // Replace with your logic for retrieving the auth token
    return localStorage.getItem('token') || '';
  };
  
  const alimentaryPlanService = {
    createPlan: async (plan: AlimentaryPlan) => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify(plan)
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Failed to create plan:', error);
        throw error;
      }
    },
  
    getUserPlans: async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch user plans:', error);
        throw error;
      }
    },
  
    sharePlan: async (planId: number) => {
      try {
        const response = await fetch(`${API_URL}/${planId}/share`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Failed to share plan:', error);
        throw error;
      }
    },
  
    addCard: async (planId: number, card: { day: number; lines: (string | RecipeCardProps)[] }) => {
      try {
        const response = await fetch(`${API_URL}/card`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
          },
          body: JSON.stringify({ planId, ...card })
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Failed to add card:', error);
        throw error;
      }
    },
  
    getCards: async (planId: number) => {
      try {
        const response = await fetch(`${API_URL}/${planId}/cards`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch cards:', error);
        throw error;
      }
    }
  };
  
  export default alimentaryPlanService;
  