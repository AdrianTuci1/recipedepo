import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealPlanCarousel from '../components/MealPlanCarusel';
import '../styles/mealplans.scss'; // Ensure this path is correct for your project structure
import alimentaryPlanService from '../redux/alimentaryPlanService';
import MealPlanOverviewCard from '../components/MealPlanOverviewCard';

interface MealPlan {
  id: string;
  name: string;
  days: number;
}

const MealPlansTable: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const data = await alimentaryPlanService.getUserPlans();
        setMealPlans(data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };

    fetchMealPlans();
  }, []);

  const handleViewClick = (id: string) => {
    navigate(`/plan-alimentar/${id}/edit`);
  };

  const handleAddMealPlan = () => {
    setShowCarousel(true);
  };

  if (showCarousel || mealPlans.length === 1) {
    return <MealPlanCarousel />;
  }

  return (
    <div className="mealplans-table-container">
        <div className="mealplans-wrapper">
      <h1>View Meal Plans</h1>
      <button className="add-mealplan-button" onClick={handleAddMealPlan}>
        Add Meal Plan
      </button>
      <div className="mealplans-cards">
          {mealPlans.map((mealPlan) => (
            <MealPlanOverviewCard
              key={mealPlan.id}
              mealPlan={mealPlan}
              onViewClick={handleViewClick}
              onEditClick={handleViewClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlansTable;
