
import { useParams } from 'react-router-dom';
import MealPlanCarousel from '../components/MealPlanCarusel';

const ViewMealPlanPage = () => {
  const { id } = useParams<{ id: string }>(); // Assuming you're using React Router

  return (
    <div>
      <h1>View Meal Plan</h1>
      <MealPlanCarousel mode="view" planId={id} />
    </div>
  );
};

export default ViewMealPlanPage;
