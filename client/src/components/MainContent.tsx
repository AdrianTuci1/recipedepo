import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Adjust the import path as necessary
import { RecipeCardProps } from './RecipeCard'; // Ensure the correct path
import '../styles/maincontent.scss';

type Filter = {
  price: number | null;
  kitchen: string;
  cookingTime: number;
  options: string[];
  difficulty: string[];
};

const MainContent: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [activeMealType, setActiveMealType] = useState<string>('all');
  const [filters, setFilters] = useState<Filter>({
    price: null,
    kitchen: '',
    cookingTime: 120,
    options: [],
    difficulty: [],
  });
  const [sortOption, setSortOption] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState({
    price: true,
    kitchen: true,
    cookingTime: true,
    options: true,
    difficulty: true,
  });

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

  const handleMealTypeChange = (type: string) => {
    setActiveMealType(type);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const checked = (e.target as HTMLInputElement).checked;
      setFilters({
        ...filters,
        price: checked ? parseInt(value) : null,
      });
    } else if (name === 'options' || name === 'difficulty') {
      const checked = (e.target as HTMLInputElement).checked;
      setFilters({
        ...filters,
        [name]: checked
          ? [...filters[name as 'options' | 'difficulty'], value]
          : filters[name as 'options' | 'difficulty'].filter(option => option !== value),
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleSectionVisibility = (section: keyof typeof visibleSections) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section],
    });
  };

  const removeFilter = (filterName: keyof Filter, filterValue?: string) => {
    if (filterName === 'price' || filterName === 'cookingTime') {
      setFilters({
        ...filters,
        [filterName]: 120,
      });
    } else if (filterName === 'options' || filterName === 'difficulty') {
      setFilters({
        ...filters,
        [filterName]: filters[filterName].filter(value => value !== filterValue),
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
    });
  };

  const filterRecipes = recipes.filter(recipe => {
    const matchesType = activeMealType === 'all' || recipe.type.toLowerCase() === activeMealType.toLowerCase();
    const matchesPrice = filters.price === null || recipe.price <= filters.price;
    const matchesKitchen = filters.kitchen ? recipe.kitchen.toLowerCase() === filters.kitchen.toLowerCase() : true;
    const cookingTime = parseInt(recipe.cookingTime, 10) + parseInt(recipe.prepTime, 10);
    const matchesCookingTime = cookingTime <= filters.cookingTime;
    const matchesOptions = filters.options.length ? filters.options.every(option => recipe.options.toLowerCase().includes(option.toLowerCase())) : true;
    const matchesDifficulty = filters.difficulty.length ? filters.difficulty.includes(recipe.difficulty.toLowerCase()) : true;

    return matchesType && matchesPrice && matchesKitchen && matchesCookingTime && matchesOptions && matchesDifficulty;
  });

  const sortedRecipes = [...filterRecipes].sort((a, b) => {
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'cookingTime') return (parseInt(a.cookingTime, 10) + parseInt(a.prepTime, 10)) - (parseInt(b.cookingTime, 10) + parseInt(b.prepTime, 10));
    return 0;
  });

  const activeFilters = Object.keys(filters).filter(key => {
    if (Array.isArray(filters[key as keyof Filter])) {
      return (filters[key as keyof Filter] as string[]).length > 0;
    }
    return filters[key as keyof Filter] !== '' && filters[key as keyof Filter] !== 120 && filters[key as keyof Filter] !== null;
  });

  return (
    <div className="recipes-page">
      <div className="left-column">
        <div className={`filters-container ${showFilters ? 'show' : ''}`}>
          <div>
            <label>Type:</label>
            <ul>
              {['all', 'main course', 'salad', 'soup', 'snack', 'sushi', 'dessert'].map(type => (
                <li
                  key={type}
                  className={activeMealType === type ? 'selected' : ''}
                  onClick={() => handleMealTypeChange(type)}
                  style={{ cursor: 'pointer', fontWeight: activeMealType === type ? 'bold' : 'normal' }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label onClick={() => toggleSectionVisibility('price')} style={{ cursor: 'pointer' }}>Price:</label>
            {visibleSections.price && (
              <ul>
                {[1, 2, 3, 4].map(price => (
                  <li key={price}>
                    <input
                      type="checkbox"
                      name="price"
                      value={price}
                      checked={filters.price === price}
                      onChange={handleFilterChange}
                    />
                    {'$'.repeat(price)}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label onClick={() => toggleSectionVisibility('kitchen')} style={{ cursor: 'pointer' }}>Kitchen:</label>
            {visibleSections.kitchen && (
              <select name="kitchen" value={filters.kitchen} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Spanish">Spanish</option>
                <option value="Russian">Russian</option>
                {/* Add more options as needed */}
              </select>
            )}
          </div>
          <div>
            <label onClick={() => toggleSectionVisibility('cookingTime')} style={{ cursor: 'pointer' }}>Cooking Time (minutes):</label>
            {visibleSections.cookingTime && (
              <>
                <input type="range" name="cookingTime" min="10" max="120" value={filters.cookingTime} onChange={handleFilterChange} />
                <div>{filters.cookingTime} minutes</div>
              </>
            )}
          </div>
          <div>
            <label onClick={() => toggleSectionVisibility('options')} style={{ cursor: 'pointer' }}>Options:</label>
            {visibleSections.options && (
              <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {['Dimineata', 'Pranz', 'Seara', 'Gustare', 'High-Protein'].map(option => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      name="options"
                      value={option}
                      checked={filters.options.includes(option)}
                      onChange={handleFilterChange}
                    />
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label onClick={() => toggleSectionVisibility('difficulty')} style={{ cursor: 'pointer' }}>Difficulty:</label>
            {visibleSections.difficulty && (
              <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {['easy', 'medium', 'hard'].map(difficulty => (
                  <div key={difficulty}>
                    <input
                      type="checkbox"
                      name="difficulty"
                      value={difficulty}
                      checked={filters.difficulty.includes(difficulty)}
                      onChange={handleFilterChange}
                    />
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="toggle-filters-btn" onClick={toggleFilters}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      <div className="right-column">
        <div className="info-section">
          <h2>{activeMealType.charAt(0).toUpperCase() + activeMealType.slice(1)} Recipes ({sortedRecipes.length} Available)</h2>
          <div>Current Filters:</div>
          <div className="active-filters">
            {activeFilters.map(filter => (
              <div key={filter} className="filter-box">
                {filter.charAt(0).toUpperCase() + filter.slice(1)}: {Array.isArray(filters[filter as keyof Filter]) ? (filters[filter as keyof Filter] as string[]).join(', ') : filters[filter as keyof Filter]}
                <button onClick={() => removeFilter(filter as keyof Filter)}>x</button>
              </div>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <button onClick={clearAllFilters}>Clear All Filters</button>
          )}
          <div>
            Sort By:
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">None</option>
              <option value="price">Price</option>
              <option value="cookingTime">Cooking Time</option>
            </select>
          </div>
        </div>
        <div className="recipe-cards">
          {sortedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
