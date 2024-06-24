
import RetetaForm from '../components/RetetaForm'
import { RecipeCardProps } from '../components/RecipeCard';
import '../styles/retetaform.scss'

function AdaugaReteta() {

const initialRecipeData:RecipeCardProps = {
  id: 0,
  title:       '', // Titlu
  imageUrl:   '', // Optional image URL
  cookingTime: 0, // Time for cooking (timp preparare, timp gatit)
  prepTime:    20,
  type:        '', // Vegan/Pui/Porc/Peste
  options:     '', // Dimineata/Pranz/Seara/Gustare
  servings:    1, // Numar de portii
  difficulty:  'easy', // Difficulty level
  price:       1, // 1-4 $$$$
  kitchen:     'toate', // Romaneasca, Italiana, Spaniola...
  otherKitchen: '',
  ingredients: '', // 400gr Pui, 1/2 linguri sare, 1 ou
  steps: '', // se prajesc cartofii, se pune puiul pe grill
  likes:       0,
  views:       0,
  comments:    0,
  author:      '',
  isPublic:    false,
}

  const handleSubmit = async (data: RecipeCardProps) => {

    try {
      const response = await fetch('http://localhost:8080/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Handle successful response (e.g., show success message)
      console.log('Recipe submitted successfully!');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {

    }
  };
  return (
    <div className='adauga-content' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <RetetaForm onSubmit={handleSubmit} initialData={initialRecipeData}/>
    </div>
  )
}

export default AdaugaReteta
