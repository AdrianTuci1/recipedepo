import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Adjust the import path as necessary
import ListRecipeCard from './ListRecipeCard'; // Import the new ListRecipeCard component
import { RecipeCardProps } from './RecipeCard'; // Ensure the correct path
import InfoSectionComponent from './InfoSectionComponent';
import { Filters } from '../types/Filters';
import '../styles/maincontent.scss';

type RecipeListProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleFilters: () => void;
};

const RecipeListComponent: React.FC<RecipeListProps> = ({ filters, setFilters, toggleFilters }) => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [isCardView, setIsCardView] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recipes/public');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const filterRecipes = () => {
    return recipes.filter(recipe => {
      const matchesType = filters.type === 'all' || recipe.type.toLowerCase() === filters.type.toLowerCase();
      const matchesPrice = filters.price === null || recipe.price <= filters.price;
      const matchesKitchen = filters.kitchen === '' || recipe.kitchen.toLowerCase() === filters.kitchen.toLowerCase();
      const cookingTime = parseInt(recipe.cookingTime, 10) + parseInt(recipe.prepTime, 10);
      const matchesCookingTime = filters.cookingTime === 120 || cookingTime <= filters.cookingTime;
      const matchesOptions = filters.options.length === 0 || filters.options.every(option => recipe.options.includes(option));
      const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(recipe.difficulty.toLowerCase());

      return matchesType && matchesPrice && matchesKitchen && matchesCookingTime && matchesOptions && matchesDifficulty;
    });
  };

  const sortedRecipes = filterRecipes().sort((a, b) => {
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'cookingTime') return (parseInt(a.cookingTime, 10) + parseInt(a.prepTime, 10)) - (parseInt(b.cookingTime, 10) + parseInt(b.prepTime, 10));
    return 0;
  });

  const activeFilters = (Object.keys(filters) as (keyof Filters)[]).filter(key => {
    if (Array.isArray(filters[key])) {
      return (filters[key] as string[]).length > 0;
    }
    return filters[key] !== '' && filters[key] !== 120 && filters[key] !== null && filters[key] !== 'all';
  });

  const removeFilter = (filterName: keyof Filters, filterValue?: string) => {
    if (filterName === 'price' || filterName === 'cookingTime') {
      setFilters({
        ...filters,
        [filterName]: filterName === 'price' ? null : 120,
      });
    } else if (filterName === 'options' || filterName === 'difficulty') {
      setFilters({
        ...filters,
        [filterName]: filters[filterName].filter((value: string) => value !== filterValue),
      });
    } else {
      setFilters({
        ...filters,
        [filterName]: '',
      });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      price: null,
      kitchen: '',
      cookingTime: 120,
      options: [],
      difficulty: [],
      type: 'all',
    });
  };

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="right-column">
      <InfoSectionComponent
        sortedRecipes={sortedRecipes}
        activeFilters={activeFilters}
        filters={filters}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
        toggleFilters={toggleFilters}
        isCardView={isCardView}
        toggleView={toggleView}
      />
      <div className="outline-container">
        <div className={`card-container ${isCardView ? 'card-view' : 'list-view'}`}>
          {sortedRecipes.map(recipe => (
            isCardView ? (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ) : (
              <ListRecipeCard key={recipe.id} recipe={recipe} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeListComponent;
