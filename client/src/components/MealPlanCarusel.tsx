import React, { useState, useRef, useEffect } from 'react';
import '../styles/mealplancarusel.scss';

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
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const activeCard = container.children[activeIndex] as HTMLElement;

      if (activeCard) {
        const scrollPosition = activeCard.offsetLeft - (containerWidth / 2 - cardWidth / 2);
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeIndex, mealPlans.length]);

  const renderCards = () => {
    const cardsToRender = [];
    const startIndex = activeIndex > 0 ? activeIndex - 1 : 0;
    const endIndex = Math.min(mealPlans.length, activeIndex + 1);

    for (let i = startIndex; i <= endIndex; i++) {
      if (mealPlans[i]) {
        cardsToRender.push(
          <div
            className={`card ${activeIndex === i ? 'active' : ''}`}
            key={i}
            onClick={() => handleCardClick(i)}
            style={{ zIndex: activeIndex === i ? 1 : 0 }}
          >
            <button
              className="remove-button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveCard(i);
              }}
            >
              ×
            </button>
            <h2>{mealPlans[i].day}</h2>
            {mealPlans[i].meals.map((meal, mealIndex) => (
              <input
                key={mealIndex}
                type="text"
                placeholder={`Meal ${mealIndex + 1}`}
                value={meal}
                onChange={(e) => handleInputChange(i, 'meals', e.target.value, mealIndex)}
              />
            ))}
            <input
              type="number"
              placeholder="Carbs"
              value={mealPlans[i].nutrition.carbs}
              onChange={(e) => handleInputChange(i, 'nutrition', { carbs: parseInt(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Protein"
              value={mealPlans[i].nutrition.protein}
              onChange={(e) => handleInputChange(i, 'nutrition', { protein: parseInt(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Calories"
              value={mealPlans[i].nutrition.calories}
              onChange={(e) => handleInputChange(i, 'nutrition', { calories: parseInt(e.target.value) })}
            />
          </div>
        );
      }
    }

    return cardsToRender;
  };

  return (
    <div className="meal-plan-carousel">
      <div className="cards-container" ref={containerRef}>
        {renderCards()}
        {/* Conditionally render the "+" card */}
        {mealPlans.length < 7 && (
          <div className={`card add-card ${activeIndex >= mealPlans.length - 1 ? 'visible' : ''}`} key="add-card" onClick={handleAddCard}>
            <span>+</span>
          </div>
        )}
      </div>
      {mealPlans.length > 0 && (
        <button className="save-button" onClick={handleSaveMealPlan}>
          Save Meal Plan
        </button>
      )}
    </div>
  );
};

export default MealPlanCarousel;


