import React, { useState } from 'react';
import FilterComponent from '../components/FilterComponent';
import RecipeListComponent from '../components/RecipeListComponent';
import { Filters } from '../types/Filters';
import '../styles/maincontent.scss';

const MainContent: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    price: null,
    kitchen: '',
    cookingTime: 120,
    options: [],
    difficulty: [],
    type: 'all',
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="recipes-page">
      <FilterComponent showFilters={showFilters} toggleFilters={toggleFilters} filters={filters} setFilters={setFilters} />
      <RecipeListComponent filters={filters} setFilters={setFilters} toggleFilters={toggleFilters} />
    </div>
  );
};

export default MainContent;
