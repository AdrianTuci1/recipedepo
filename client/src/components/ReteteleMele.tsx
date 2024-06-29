import RecipeCard, {RecipeCardProps} from "./RecipeCard"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface RecipeListProps {
}

function ReteteleMele({}: RecipeListProps) {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Optional for loading state
  const [error, setError] = useState<string | null>(null); // Optional for error handling

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error on each fetch
      const token = Cookies.get('auth_token')

      try {
        const response = await fetch('http://localhost:8080/api/recipes/user/recipes',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Replace with your server URL
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes'); // Set error message
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="panne" style={{display: 'flex'}}>
      <h2 className="retete-m">Retetele Mele</h2>
      <button style={{width:'100px'}} onClick={() => navigate('/adauga')}>ADAUGA O RETETA</button>
      </div>
      <div className="recipe-container">
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="recipe-list" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', overflow: 'hidden' }}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default ReteteleMele

