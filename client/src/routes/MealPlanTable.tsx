import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealPlanCarousel from '../components/MealPlanCarusel';
import '../styles/mealplans.scss'; // Ensure this path is correct for your project structure

interface MealPlan {
  id: string;
  title: string;
  days: number;
}

const MealPlansTable: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch meal plans from your API
    const fetchMealPlans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/mealplans');
        const data = await response.json();
        setMealPlans(data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };

    fetchMealPlans();
  }, []);

  const handleViewClick = (id: string) => {
    navigate(`/mealplans/${id}`);
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
      <table className="mealplans-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Days</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {mealPlans.map((mealPlan) => (
            <tr key={mealPlan.id}>
              <td>{mealPlan.title}</td>
              <td>{mealPlan.days}</td>
              <td>
                <button className="view-button" onClick={() => handleViewClick(mealPlan.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MealPlansTable;
