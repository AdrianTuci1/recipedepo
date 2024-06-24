
import RetetaForm from '../components/RetetaForm'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeCardProps } from '../components/RecipeCard';
import '../styles/retetaform.scss'

function EditeazaReteta() {
  const [recipeData, setRecipeData] = useState<RecipeCardProps | null>(null);

  const { recipeId } = useParams(); // Obține ID-ul rețetei din URL

  useEffect(() => {
    // Efectuați o solicitare API pentru a obține detaliile rețetei specifice
    // pe baza ID-ului din useParams
    fetch(`http://localhost:8080/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipeData(data))
      .catch((error) => console.error('Eroare la încărcarea rețetei:', error));
  }, [recipeId]); // Depinde de recipeId

  const handleSubmit = async (data: RecipeCardProps) => {

    try {
      const response = await fetch('http://localhost:8080/api/recipes/:id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Handle successful response (e.g., show success message)
      console.log('Recipe submitted successfully!');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {

    }
  };
  return (
    <div className='adauga-content' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      { recipeData ? (
      <RetetaForm initialData={recipeData} onSubmit={handleSubmit}/>
    ) : (
      <p className="loading">Loading data...</p>
    )}
    </div>
  )
}

export default EditeazaReteta