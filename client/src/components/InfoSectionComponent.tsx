import React from 'react';
import { Filters } from '../types/Filters';
import { useMediaQuery, useTheme } from '@mui/material';

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className="info-section">
      <div className="type-ava">
      <h2>{recipeType.charAt(0).toUpperCase() + recipeType.slice(1)} Recipes</h2>
      <h4>({sortedRecipes.length} Available)</h4>
      </div>
      <div className="filter-section">
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
      <div className='bar-section'>
        {isSmallScreen && (
          <button className="toggle-filters-btn filbtn" onClick={toggleFilters}>
            <p>Filtreaza</p> 
            <img src="/chevrdown.png" alt="" style={{width:'25px'}}/>
          </button>
        )}
        <div className="sort-by">
          <div className='sort-label'>
        Sorteaza:
          </div>
          <select value={sortOption} onChange={handleSortChange} className='sort-select'>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="cookingTime">Cooking Time</option>
          </select>
        </div>
        <div className="afisaza">
            <button className='btn-cardtype'><img src="/cards.png" alt="" style={{width:'40px'}}/></button>
            <button className='btn-cardtype'><img src="/list.png" alt="" style={{width:'40px'}}/></button>
        </div>
      </div>
    </div>
  );
};

export default InfoSectionComponent;


