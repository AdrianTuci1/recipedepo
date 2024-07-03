import { useState } from 'react';
import '../styles/retetapage.scss';
import { Clock, Forward, CookingPot, Eye, MessagesSquare, User, Heart } from 'lucide-react';
import { RecipeCardProps } from './RecipeCard';

function RecipeDetails({ recipe }: { recipe: RecipeCardProps }) {
  const { steps: stepsString, ingredients: ingredientsString, type, title, options, servings, difficulty, price, kitchen, views, comments, likes, userId, prepTime, cookingTime } = recipe;

  const steps = JSON.parse(stepsString);
  const ingredients = JSON.parse(ingredientsString);

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const showBackButton = currentStep > 0;
  const showNextButton = currentStep < steps.length - 1;

  return (
    <>
    <div className="page-box">
    <div className="reteta-page">
        <div className="image-containe">
          <img src="./recipedesc.jpeg" alt="" className="recipeimg" />
        </div>
        <div className="ingredients-container">
          <h3>Ingrediente</h3>
          <ul className="ingredients-list">
            {ingredients.map((ingredient: string) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="header">
          <h1 className="titlez">{title}</h1>
          <div className="type">{type}</div>
        </div>
        <div className="options">
          <div className="option-item">{servings}</div>
          <div className="option-item">{difficulty}</div>
          <div className="option-item">{price}</div>
          <div className="option-item">{kitchen}</div>
        </div>
        <div className="times">
          <div className="time-item"><Clock className="icon" /> Timp prep: <p>{prepTime}</p></div>
          <div className="time-item"><Clock className="icon" /> Timp gatit: <p>{cookingTime}</p></div>
        </div>
        <div className="instructions-container">
          <h3>Instructiuni de Preparare:</h3>
          <div className="instructiuni">
            <div className="ins-text">
              <CookingPot className="icon" />
              <p>{steps[currentStep]}</p>
            </div>
            <div className="Step-nav">
              {showBackButton && (
                <button className="ins-button" onClick={handlePreviousStep}>Inapoi</button>
              )}
              {showNextButton && (
                <button className="ins-button" onClick={handleNextStep}>Urmatoarea &gt;</button>
              )}
            </div>
          </div>
        </div>
        <div className="like-print-share">
          <div className="icon-wrapper"><Heart className="icon" /></div>
          <div className="icon-wrapper"><img src="./printer.png" alt="Print" className="icon" /></div>
          <div className="icon-wrapper"><Forward className="icon" /></div>
        </div>
        <div className="social">
          <div className="views icn sc"><Eye className="icon" /> {views}</div>
          <div className="comments icn sc"><MessagesSquare className="icon" /> {comments}</div>
          <div className="likes icn sc"><Heart className="icon" /> {likes}</div>
          <div className="username icn"><User className="icon" /> {userId}</div>
        </div>
      </div>
      </div>
    </>
  );
}

export default RecipeDetails;
