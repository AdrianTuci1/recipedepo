import '../styles/recipecard.scss'
import { useNavigate } from 'react-router-dom';

export interface RecipeCardProps {
  // Define the data you want to pass to the component
  id:          number;
  title:       string; // Titlu
  imageUrl?:   string; // Optional image URL
  cookingTime: number; // Time for cooking (timp preparare, timp gatit)
  prepTime:    number;
  type:        string; // Vegan/Pui/Porc/Peste
  options:     string; // Dimineata/Pranz/Seara/Gustare
  servings:    number; // Numar de portii
  difficulty:  string; // Difficulty level
  price:       number; // 1-4 $$$$
  kitchen:     string; // Romaneasca, Italiana, Spaniola...
  otherKitchen?:string;
  ingredients: string; // 400gr Pui, 1/2 linguri sare, 1 ou
  steps:       string; // se prajesc cartofii, se pune puiul pe grill
  author:      string;
  likes:       number; 
  views:       number;
  comments:    number;
  userId:      string;
  isPublic:    boolean;
  approved:    boolean;
}

function RecipeCard({ recipe }: { recipe: RecipeCardProps}) {
  const navigate = useNavigate();

  const handleRecipeClick = (id: number) => {
    const recipeId = id;
    navigate(`/retete/${recipeId}`);
  };
  return (
    <div className="recipe-card">
      <div className="continut-circle">
        <img src={recipe.imageUrl || ''} alt="" />
      </div>
      <div className="image-container">
        <img src={recipe.imageUrl || ''} alt="" />
      </div>
      <div className="description-container">
        <p className="likes">{recipe.likes} Likes</p>
        <h2 className='recipe-title'>{recipe.title}</h2>
        <div className="icons-container">
          <p className="time">{recipe.cookingTime}</p>
          <p className="serving">{recipe.servings} people</p>
          <p className="dificulty">{recipe.difficulty}</p>
        </div>
        <button className="view-recipe" onClick={() => handleRecipeClick(recipe.id)}>
          VIEW RECIPE
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
