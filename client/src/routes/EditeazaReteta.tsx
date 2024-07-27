import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeCardProps } from '../components/RecipeCard';
import RetetaForm from '../components/RetetaForm';
import '../styles/retetaform.scss';
import Cookies from 'js-cookie';

function EditeazaReteta() {
  const [recipeData, setRecipeData] = useState<RecipeCardProps | null>(null);
  const { recipeId } = useParams(); // Get recipe ID from URL

  useEffect(() => {
    // Make an API request to get the recipe details based on the ID from useParams
    fetch(`http://localhost:8080/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipeData(data))
      .catch((error) => console.error('Error loading recipe:', error));
  }, [recipeId]); // Dependency on recipeId

  const handleSubmit = async (formData: FormData) => {
    console.log('Submitting Recipe:', formData);
    console.log('Recipe ID:', recipeId);
    try {
      const token = Cookies.get('auth_token');
      const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // Use FormData directly
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Handle successful response (e.g., show success message)
      console.log('Recipe submitted successfully!');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {
      // Any cleanup or final actions
    }
  };

  return (
    <div className='adauga-content' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {recipeData ? (
        <RetetaForm initialData={recipeData} onSubmit={handleSubmit} />
      ) : (
        <p className="loading">Loading data...</p>
      )}
    </div>
  );
}

export default EditeazaReteta;
