import React from 'react';
import { Filters } from '../types/Filters';

type FilterProps = {
  showFilters: boolean;
  toggleFilters: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FilterComponent: React.FC<FilterProps> = ({ showFilters, toggleFilters, filters, setFilters }) => {
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

  const handleTypeChange = (type: string) => {
    setFilters({
      ...filters,
      type,
    });
  };

  return (
    <div className={`left-column ${showFilters ? 'show' : ''}`}>
      <div className={`filters-container ${showFilters ? 'show' : ''}`}>
        <div>
          <label>Type:</label>
          <ul>
            {['all', 'main course', 'salad', 'soup', 'snack', 'sushi', 'dessert'].map(type => (
              <li key={type} onClick={() => handleTypeChange(type)}>
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Price:</label>
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
        </div>
        <div>
          <label>Kitchen:</label>
          <select name="kitchen" value={filters.kitchen} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Spanish">Spanish</option>
            <option value="Russian">Russian</option>
          </select>
        </div>
        <div>
          <label>Cooking Time (minutes):</label>
          <input type="range" name="cookingTime" min="10" max="120" value={filters.cookingTime} onChange={handleFilterChange} />
          <div>{filters.cookingTime} minutes</div>
        </div>
        <div>
          <label>Options:</label>
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
        </div>
        <div>
          <label>Difficulty:</label>
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
        </div>
      </div>
      <button className="toggle-filters-btn" onClick={toggleFilters}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>
  );
};

export default FilterComponent;


