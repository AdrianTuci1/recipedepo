import { useNavigate } from 'react-router-dom';
import { Clock2 } from 'lucide-react';
import '../styles/listrecipecard.scss';

export interface RecipeCardProps {
  id: number;
  title: string;
  imageUrl?: string;
  cookingTime: string;
  prepTime: string;
  type: string;
  options: string;
  servings: number;
  difficulty: string;
  price: number;
  kitchen: string;
  otherKitchen?: string;
  ingredients: string;
  steps: string;
  author: string;
  likes: number; 
  views: number;
  comments: number;
  userId: string;
  isPublic: boolean;
  approved: boolean;
}

function ListRecipeCard({ recipe }: { recipe: RecipeCardProps }) {
  const navigate = useNavigate();

  const handleRecipeClick = (id: number) => {
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

  return (
    <div className="list-card" onClick={() => handleRecipeClick(recipe.id)}>
      <div className="list-content">
        <div className="list-image-container">
          <img className="recipe-image" src={recipe.imageUrl || ''} alt="" />
          <img className="overlay-image" src={overlayImage} alt="Option icon" />
        </div>
        <div className="list-description-container">
          <p className="likes"><img src="/hearta.png" alt="" style={{width:'25px'}}/>{recipe.likes}</p>
          <h2 className='recipe-title'>{recipe.title}</h2>
          <div className="icons-container">
            <p className="time"><Clock2 style={{width:'30px'}}/>{totalTime}</p>
            <p className="serving"><img src="/person.png" alt="" style={{width:'25px'}}/>{recipe.servings}</p>
            <p className="difficulty"><img src={difficultyLevel} alt="" style={{width:'30px'}}/></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListRecipeCard;
