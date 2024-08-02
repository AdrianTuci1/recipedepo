import React from 'react';
import '../styles/mealplanoverview.scss'

interface MealPlan {
  id: string;
  name: string;
  days: number;
}

interface MealPlanOverviewCardProps {
  mealPlan: MealPlan;
  onViewClick: (id: string) => void;
  onEditClick: (id: string) => void;
}

const MealPlanOverviewCard: React.FC<MealPlanOverviewCardProps> = ({ mealPlan, onViewClick, onEditClick }) => {
  return (
    <div className="mealplan-overview-card">
      <h2>{mealPlan.name}</h2>
      <p>Days: {mealPlan.days}</p>
      <div className="card-buttons">
        <button onClick={() => onViewClick(mealPlan.id)}>View</button>
        <button onClick={() => onEditClick(mealPlan.id)}>Edit</button>
      </div>
    </div>
  );
};

export default MealPlanOverviewCard;
