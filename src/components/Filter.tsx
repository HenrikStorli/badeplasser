import React from 'react';
import { FilterOptions } from '../types';
import { Filter, MapPin, Waves, Coffee, Car, Bath } from 'lucide-react';

interface FilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (key: keyof FilterOptions, value: boolean | string[]) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelectChange = (key: keyof FilterOptions, value: string, checked: boolean) => {
    const currentValues = filters[key] as string[];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    handleCheckboxChange(key, newValues);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <Filter size={20} />
        <h3>Filters</h3>
      </div>
      
      <div className="filter-section">
        <h4>Amenities</h4>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.hasBeach}
              onChange={(e) => handleCheckboxChange('hasBeach', e.target.checked)}
            />
            <Waves size={16} />
            <span>Beach</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.hasDivingTower}
              onChange={(e) => handleCheckboxChange('hasDivingTower', e.target.checked)}
            />
            <MapPin size={16} />
            <span>Diving Tower</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.hasChangingRooms}
              onChange={(e) => handleCheckboxChange('hasChangingRooms', e.target.checked)}
            />
            <Bath size={16} />
            <span>Changing Rooms</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.hasToilets}
              onChange={(e) => handleCheckboxChange('hasToilets', e.target.checked)}
            />
            <span>🚽</span>
            <span>Toilets</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.hasParking}
              onChange={(e) => handleCheckboxChange('hasParking', e.target.checked)}
            />
            <Car size={16} />
            <span>Parking</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.hasCafe}
              onChange={(e) => handleCheckboxChange('hasCafe', e.target.checked)}
            />
            <Coffee size={16} />
            <span>Cafe</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.isPaid}
              onChange={(e) => handleCheckboxChange('isPaid', e.target.checked)}
            />
            <span>Paid Entry</span>
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Water Quality</h4>
        <div className="filter-options">
          {['excellent', 'good', 'fair', 'poor'].map((quality) => (
            <label key={quality} className="filter-option">
              <input
                type="checkbox"
                checked={filters.waterQuality.includes(quality)}
                onChange={(e) => handleMultiSelectChange('waterQuality', quality, e.target.checked)}
              />
              <span style={{ textTransform: 'capitalize' }}>{quality}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Season</h4>
        <div className="filter-options">
          {['summer', 'year-round', 'indoor'].map((season) => (
            <label key={season} className="filter-option">
              <input
                type="checkbox"
                checked={filters.season.includes(season)}
                onChange={(e) => handleMultiSelectChange('season', season, e.target.checked)}
              />
              <span style={{ textTransform: 'capitalize' }}>
                {season === 'year-round' ? 'Year Round' : season}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent; 