import { useState } from 'react';
import '../styles/retetapage.scss';
import { Clock, Heart, Forward, CookingPot, Eye, MessagesSquare, User } from 'lucide-react';
import { RecipeCardProps } from './RecipeCard';



function RecipeDetails({ recipe }: { recipe: RecipeCardProps }) {
  // Destructure recipe data
  let { steps } = recipe;

  // State for current Step index (starts at 0)
  const [currentStep, setCurrentStep] = useState(0);

  // Function to handle next Step button click
  const handleNextStep = () => {
    steps = JSON.parse(steps)
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
  };

  // Function to handle previous Step button click
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Check if back button should be displayed
  const showBackButton = currentStep > 0;
  let s = JSON.parse(steps)
  const showNextButton = currentStep < s.length - 1;

  return (
    <>
      <div className="reteta-page">
        <div className="reteta-left">
          <img src="./recipedesc.jpeg" alt="" className="recipe-image" />
        </div>
        <div className="reteta-right">
          <div className="like-print-share">
            <div className="heart d">
              <Heart />
            </div>
            <div className="print d">
              <img src="./printer.png" alt="" style={{ width: '30px', height: '30px' }} />
            </div>
            <div className="share d">
              <Forward />
            </div>
          </div>
          <div className="reteta-wrapper">
            <p className="type">{recipe.type}</p>
            <h1 className="reteta-title">{recipe.title}</h1>
            <p className="reteta-optiuni">{recipe.options}</p>
            <ul className="reteta-ingrediente">
            {typeof recipe.ingredients === "string" && (
    JSON.parse(recipe.ingredients).map((ingredient: string) => (
      <li key={ingredient}>{ingredient}</li>
    )))}
            </ul>
            <h3 className="mod">Instructiuni de Preparare:</h3>
          </div>
          <div className="social-ins">
            <div className="instructiuni">
              {/* Display only current Step */}
              <div className="ins-text">
                <div className="cook">
                  <CookingPot />
                </div>
                <p>{typeof recipe.steps === "string"
        && JSON.parse(recipe.steps)[currentStep]}</p>
              </div>
              <div className="Step-nav">
                {/* Conditionally display back button */}
                {showBackButton && (
                  <button className="ins-button" onClick={handlePreviousStep}>Inapoi</button>
                )}
                {showNextButton && (
                <button className="ins-button" onClick={handleNextStep}>Urmatoarea &gt;</button>
                )}
              </div>
            </div>
            <div className="social">
              <div className="views icn sc">
                <Eye className="a" /> {recipe.views}
              </div>
              <div className="comments icn sc">
                <MessagesSquare className="a" /> {recipe.comments}
              </div>
              <div className="likes icn sc">
                <Heart className="a" /> {recipe.likes}
              </div>
              <div className="username icn">
                <User className="a" /> {recipe.userId}
              </div>
            </div>
          </div>
        </div>
        <div className="preparare">
          <Clock />
          <div className="timp-preparare">Timp prep: <p>{recipe.prepTime}</p></div>
          <div className="timp-gatit">Timp gatit: <p>{recipe.cookingTime}</p></div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
