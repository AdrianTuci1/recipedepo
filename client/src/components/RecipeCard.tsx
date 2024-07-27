import '../styles/recipecard.scss'
import { useNavigate } from 'react-router-dom';
import { Clock2 } from 'lucide-react';

export interface RecipeCardProps {
  // Define the data you want to pass to the component
  id:             string;
  title:          string; // Titlu
  imageUrl?:      string; // Optional image URL
  cookingTime:    string; // Time for cooking (timp preparare, timp gatit)
  prepTime:       string;
  type:           string; // Vegan/Pui/Porc/Peste
  options:        string; // Dimineata/Pranz/Seara/Gustare
  servings:       number; // Numar de portii
  difficulty:     string; // Difficulty level
  price:          number; // 1-4 $$$$
  kitchen:        string; // Romaneasca, Italiana, Spaniola...
  otherKitchen?:  string;
  ingredients:    string; // 400gr Pui, 1/2 linguri sare, 1 ou
  steps:          string; // se prajesc cartofii, se pune puiul pe grill
  author:         string;
  likes:          number; 
  views:          number;
  commentsCount:  number;
  userId:         string;
  isPublic:       boolean;
  approved:       boolean;
}

function RecipeCard({ recipe }: { recipe: RecipeCardProps}) {
  const navigate = useNavigate();

  const handleRecipeClick = (id: string) => {
    const recipeId = id;
    navigate(`/retete/${recipeId}`);
  };

  const getOverlayImage = (options: string) => {
    switch (options) {
      case 'High-Protein':
        return '/protein.png';
      case 'Vegan':
        return '/vegan.png';
      case 'Balanced':
        return '/balanced.png';
      case 'Traditional':
        return '/traditional.png';
      default:
        return '/protein.png';
    }
  };

  const getDifficulty = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '/easy.png';
      case 'medium':
        return '/medium.png';
      case 'hard':
        return '/hard.png';
      default:
        return 'Unknown';
    }
  };

  const overlayImage = getOverlayImage(recipe.options);
  const difficultyLevel = getDifficulty(recipe.difficulty);

  const totalTime = parseInt(recipe.cookingTime, 10) + parseInt(recipe.prepTime, 10);
  const imageUrl = `http://localhost:8080${recipe.imageUrl}`;

  return (
    <div className="card">
      <div className="content">
      <div className="image-container">
        <img className="recipe-image" src={imageUrl || ''} alt="" />
        <img className="overlay-image" src={overlayImage} alt="Option icon" />
      </div>
      <div className="description-container">
        <p className="likes"><img src="/hearta.png" alt="" style={{width:'25px'}}/>{recipe.likes}</p>
        <h2 className='recipe-title'>{recipe.title}</h2>
        <div className="icons-container">
          <p className="time"><Clock2 style={{width:'30px'}}/>{totalTime} min</p>
          <p className="serving"><img src="/person.png" alt="" style={{width:'25px'}}/>{recipe.servings} pers.</p>
          <p className="dificulty"><img src={difficultyLevel} alt="" style={{width:'30px'}}/></p>
        </div>
        <button className="view-button" onClick={() => handleRecipeClick(recipe.id)}>
          VEZI RETETA
        </button>
      </div>
      </div>
    </div>
  );
}

export default RecipeCard;
