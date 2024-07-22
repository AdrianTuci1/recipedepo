import React from 'react';
import '../styles/mealplancarusel.scss';

type MealPlan = {
  day: string;
  meals: string[];
  nutrition: { carbs: number; protein: number; calories: number };
};

type MealPlanCardProps = {
  mealPlan: MealPlan;
  index: number;
  activeIndex: number;
  onCardClick: (index: number) => void;
  onRemoveCard: (index: number) => void;
  onInputChange: (index: number, type: 'meals' | 'nutrition', value: any, mealIndex?: number) => void;
};

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  mealPlan,
  index,
  activeIndex,
  onCardClick,
  onRemoveCard,
  onInputChange,
}) => {
  return (
    <div
      className={`card ${activeIndex === index ? 'active' : ''}`}
      onClick={() => onCardClick(index)}
      style={{ zIndex: activeIndex === index ? 1 : 0 }}
    >
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveCard(index);
        }}
      >
        ×
      </button>
      <h2>{mealPlan.day}</h2>
      {mealPlan.meals.map((meal, mealIndex) => (
        <input
          key={mealIndex}
          type="text"
          placeholder={`Meal ${mealIndex + 1}`}
          value={meal}
          onChange={(e) => onInputChange(index, 'meals', e.target.value, mealIndex)}
        />
      ))}
      <input
        type="number"
        placeholder="Carbs"
        value={mealPlan.nutrition.carbs}
        onChange={(e) => onInputChange(index, 'nutrition', { carbs: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Protein"
        value={mealPlan.nutrition.protein}
        onChange={(e) => onInputChange(index, 'nutrition', { protein: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Calories"
        value={mealPlan.nutrition.calories}
        onChange={(e) => onInputChange(index, 'nutrition', { calories: parseInt(e.target.value) })}
      />
    </div>
  );
};

export default MealPlanCard;
