import React, { useState, useRef, useEffect } from 'react';
import '../styles/mealplancarusel.scss';
import MealPlanCard from './MealPlanCard';

type MealPlan = {
  day: string;
  meals: string[];
  nutrition: { carbs: number; protein: number; calories: number };
};

const MealPlanCarousel: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddCard = () => {
    if (mealPlans.length < 7) {
      const newPlans = [
        ...mealPlans,
        { day: `Day ${mealPlans.length + 1}`, meals: ['', '', ''], nutrition: { carbs: 0, protein: 0, calories: 0 } },
      ];
      setMealPlans(newPlans);
      setActiveIndex(newPlans.length - 1); // Set active index to the new card
    }
  };

  const handleInputChange = (index: number, type: 'meals' | 'nutrition', value: any, mealIndex?: number) => {
    const newMealPlans = [...mealPlans];
    if (type === 'meals' && mealIndex !== undefined) {
      newMealPlans[index].meals[mealIndex] = value;
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

  const handleSaveMealPlan = () => {
    console.log('Meal Plan Saved:', mealPlans);
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
    <div className="appcarusel">
      <div className="meal-plan-carousel">
        <div className="cards-container-wrapper">
          <div className="cards-container" ref={containerRef}>
            {renderCards()}
            {/* Conditionally render the "+" card */}
            {mealPlans.length === 0 || activeIndex === mealPlans.length - 1 ? (
              <div className={`card add-card ${activeIndex >= mealPlans.length - 1 ? 'visible' : ''}`} key="add-card" onClick={handleAddCard}>
                <span>+</span>
              </div>
            ) : null}
          </div>
        </div>
        {mealPlans.length > 0 && (
          <button className="save-button" onClick={handleSaveMealPlan}>
            Save Meal Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default MealPlanCarousel;
