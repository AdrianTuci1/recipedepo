import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import '../styles/retetapage.scss';
import { RecipeCardProps } from '../types/RecipeCardProps';

function RetetaPage() {
  const [recipeData, setRecipeData] = useState<RecipeCardProps | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { recipeId } = useParams(); // Obține ID-ul rețetei din URL
  const navigate = useNavigate();

  useEffect(() => {
    // Efectuați o solicitare API pentru a obține detaliile rețetei specifice
    // pe baza ID-ului din useParams
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => setRecipeData(data))
      .catch((error) => console.error('Eroare la încărcarea rețetei:', error));
  }, [recipeId]); // Depinde de recipeId

  const handleEditClick = (id: string | undefined) => {
    const recipeId = id;
    navigate(`/retete/edit/${recipeId}`);
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true); // Show loading state while deleting
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Reteta a fost stearsa cu succes!');
        navigate(-1);
      } else {
        console.error('Eroare la stergerea retetei:', await response.text());
        setIsDeleting(false); // Reset deletion state if error occurs
      }
    } catch (error) {
      console.error('Eroare la stergerea retetei:', error);
      setIsDeleting(false); // Reset deletion state if error occurs
    }
  };

  return (
    <>
    {recipeData ? (
      <div className="sectiune_reteta" >
        <RecipeDetails recipe={recipeData}/>
        <div className="butoane" style={{display:'flex'}}>
          <button className="btn-reteta" onClick={() => navigate(-1)}>ÎNAPOI</button>
          <button className="btn-reteta"onClick={() => handleEditClick(recipeId)}>EDITARE</button>
          <button className="btn-reteta" disabled={isDeleting} onClick={handleDeleteClick}>
            {isDeleting ? 'ȘTERGE...' : 'ȘTERGE'}
          </button> 
        </div>
      </div>
    ) : (
      <p className="loading">Incarcare reteta...</p>
    )}
    </>
  );
}

export default RetetaPage;
