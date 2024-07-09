import React from 'react';
import { Filters } from '../types/Filters';

type InfoSectionProps = {
  sortedRecipes: any[];
  activeFilters: (keyof Filters)[];
  filters: Filters;
  removeFilter: (filterName: keyof Filters, filterValue?: string) => void;
  clearAllFilters: () => void;
  sortOption: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleFilters: () => void;
};

const InfoSectionComponent: React.FC<InfoSectionProps> = ({
  sortedRecipes,
  activeFilters,
  filters,
  removeFilter,
  clearAllFilters,
  sortOption,
  handleSortChange,
  toggleFilters,
}) => {
  const recipeType = filters.type || '';

  return (
    <div className="info-section">
      <h2>{recipeType.charAt(0).toUpperCase() + recipeType.slice(1)} Recipes ({sortedRecipes.length} Available)</h2>
      <div>
        <button className="toggle-filters-btn" onClick={toggleFilters}>
          Filter
        </button>
        Sort By:
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="cookingTime">Cooking Time</option>
        </select>
      </div>
      <div>Current Filters:</div>
      <div className="active-filters">
        {activeFilters
          .filter(filter => filter !== 'type')
          .map(filter => (
            <div key={filter as string} className="filter-box">
              {filter.charAt(0).toUpperCase() + filter.slice(1)}: {Array.isArray(filters[filter]) ? (filters[filter] as string[]).join(', ') : filters[filter]?.toString()}
              <button onClick={() => removeFilter(filter)}>x</button>
            </div>
          ))}
      </div>
      {activeFilters.length > 0 && (
        <button onClick={clearAllFilters}>Clear All Filters</button>
      )}
    </div>
  );
};

export default InfoSectionComponent;

