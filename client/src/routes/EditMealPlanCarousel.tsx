import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/mealplancarusel.scss';
import MealPlanCard from '../components/MealPlanCard';
import { RecipeCardProps } from '../components/SmallRecipeCard';
import alimentaryPlanService from '../redux/alimentaryPlanService';
import recipeService from '../redux/recipeService';

type MealPlan = {
  day: string;
  meals: (string | RecipeCardProps)[];
  nutrition: { carbs: number; protein: number; calories: number };
};

const EditMealPlanCarousel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mealPlanName, setMealPlanName] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const fetchMealPlan = async () => {
        try {
          const plan = await alimentaryPlanService.getPlan(id);
          setMealPlanName(plan.name);

          const enrichedCards = await Promise.all(plan.cards.map(async (card: any) => {
            const meals = await Promise.all(card.lines.map(async (line: any) => {
              if (typeof line === 'string') {
                return line;
              } else {
                const recipe = await recipeService.getRecipe(line.id);
                return recipe;
              }
            }));
            return { ...card, meals };
          }));

          setMealPlans(enrichedCards);
        } catch (error) {
          console.error('Error fetching meal plan:', error);
        }
      };

      fetchMealPlan();
    }
  }, [id]);

  const handleAddCard = () => {
    if (mealPlans.length < 7) {
      const newPlans = [
        ...mealPlans,
        { day: `${mealPlans.length + 1}`, meals: [], nutrition: { carbs: 0, protein: 0, calories: 0 } },
      ];
      setMealPlans(newPlans);
      setActiveIndex(newPlans.length - 1); // Set active index to the new card
    }
  };

  const handleInputChange = (index: number, type: 'meals', value: (string | RecipeCardProps)[]) => {
    const newMealPlans = [...mealPlans];
    if (type === 'meals') {
      newMealPlans[index].meals = value;
    } else if (type === 'nutrition') {
      newMealPlans[index].nutrition = { ...newMealPlans[index].nutrition, ...value };
    }
    setMealPlans(newMealPlans);
  };

  const handleRemoveCard = (index: number) => {
    const newMealPlans = mealPlans.filter((_, i) => i !== index);
    setMealPlans(newMealPlans);
    setActiveIndex(Math.max(0, newMealPlans.length - 1));
  };

  const handleSaveMealPlan = async () => {
    const mealPlanData = {
      name: mealPlanName,
      isShared: false,
      cards: mealPlans.map((plan, index) => ({
        day: index + 1,
        lines: plan.meals.map(meal => {
          if (typeof meal === 'string') {
            return meal;
          } else {
            return { id: meal.id }; // Only save the recipe ID
          }
        })
      }))
    };

    try {
      if (id) {
        // Update existing plan
        await alimentaryPlanService.updatePlan(id, mealPlanData);
        console.log('Meal Plan Updated:', mealPlanData);
      }
    } catch (error) {
      console.error('Failed to save meal plan:', error);
    }
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const cardWidth = container.children[activeIndex]?.getBoundingClientRect().width || 0;
      const activeCard = container.children[activeIndex] as HTMLElement;

      if (activeCard) {
        const scrollPosition = activeCard.offsetLeft - (containerWidth / 2 - cardWidth / 2) + (containerWidth / 2 - cardWidth / 2);
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeIndex, mealPlans.length]);

  const renderCards = () => {
    const cardsToRender = [];
    const startIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    const endIndex = Math.min(mealPlans.length, activeIndex + 2);

    for (let i = startIndex; i < endIndex; i++) {
      if (mealPlans[i]) {
        cardsToRender.push(
          <MealPlanCard
            key={i}
            mealPlan={mealPlans[i]}
            index={i}
            activeIndex={activeIndex}
            onCardClick={handleCardClick}
            onRemoveCard={handleRemoveCard}
            onInputChange={handleInputChange}
          />
        );
      }
    }

    return cardsToRender;
  };

  return (
    <div className="appcarusel edit-app">
      <div className="meal-plan-carousel">
        <div className="set-name-container">
          <div className="set-name-wrapper">
          <h2>Modifica Planul Alimentar</h2>
          <input
            type="text"
            value={mealPlanName}
            onChange={(e) => setMealPlanName(e.target.value)}
            placeholder="Titlu"
          />
        </div>
        </div>
        <div className="cards-container-wrapper">
          <div className={`cards-container ${activeIndex === 0 ? 'offset-right' : ''}`} ref={containerRef}>
            {renderCards()}
            {/* Conditionally render the "+" card */}
            {mealPlans.length === 0 || activeIndex === mealPlans.length - 1 ? (
              <div className={`card add-card ${activeIndex >= mealPlans.length - 1 ? 'visible' : ''}`} key="add-card" onClick={handleAddCard}>
                <span>+</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="btn-wrap">
          {mealPlans.length > 0 && (
            <button className="save-button" onClick={handleSaveMealPlan}>
              Save Meal Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMealPlanCarousel;
