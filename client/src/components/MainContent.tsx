import Tabs from "./Tabs"
import { useState, useEffect } from "react";
import '../styles/maincontent.scss'
import RecipeCard, { RecipeCardProps } from "./RecipeCard";


function MainContent() {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Optional for loading state
  const [error, setError] = useState<string | null>(null); // Optional for error handling

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error on each fetch

      try {
        const response = await fetch('http://localhost:8080/api/recipes/public'); // Replace with your server URL
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes'); // Set error message
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

    // Food Categories with type assertion
const foodCategories = [
      { value: 'toate', label: 'Toate' },
      { value: 'dimineata', label: 'Dimineata' },
      { value: 'pranz', label: 'Pranz' },
      { value: 'seara', label: 'Seara' },
      { value: 'desert', label: 'Desert' },
      { value: 'gustare', label: 'Gustare' },
    ];

    const [selectedTab, setSelectedTab] = useState<string>('Toate'); // State for selected tab

    const handleTabSelect = (newTab: string) => {
      setSelectedTab(newTab);
    };
  

  return (
    <div className="main-content">
      <Tabs options={foodCategories} onSelect={handleTabSelect}/>

      <h1>{selectedTab}</h1>
      <div className="second_row">
      <div>Vezi 30 de retete</div>
      <div className="sorteaza">
        Sorteaza dupa:
        <select id="sort-dropdown" className="sort-dropdown" defaultValue={'newest'}>
            <option value="newest">Newest</option>
            <option value="liked">Most Liked</option>
            <option value="price_asc">Price: Low to High</option>
        </select>
      </div>
      </div>
      <div className="filter-row">
        <p>Price: $$</p>
        <p>Continut: Pui</p>
        <p>Sterge filtrele</p>
      </div>
      <div className="recipe-card-container">
          <div className="alignment">
          <div className="recipe-container" style={{minHeight:'400px'}}>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="recipe-list" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', overflow: 'hidden' }}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
          </div>
      </div>
      
    </div>
  )
}

export default MainContent