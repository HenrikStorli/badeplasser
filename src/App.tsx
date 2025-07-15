import React, { useState, useMemo } from 'react';
import MapComponent from './components/Map';
import FilterComponent from './components/Filter';
import { SwimmingSpot, FilterOptions } from './types';
import { swimmingSpots as initialSpots } from './data/swimmingSpots';
import { Waves } from 'lucide-react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const defaultNewSpot: Omit<SwimmingSpot, 'id'> = {
  name: '',
  description: '',
  latitude: 59.91,
  longitude: 10.75,
  hasBeach: false,
  hasDivingTower: false,
  isPaid: false,
  hasChangingRooms: false,
  hasToilets: false,
  hasParking: false,
  hasCafe: false,
  waterQuality: 'good',
  season: 'summer',
};

const App: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<SwimmingSpot | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    hasBeach: false,
    hasDivingTower: false,
    isPaid: false,
    hasChangingRooms: false,
    hasToilets: false,
    hasParking: false,
    hasCafe: false,
    waterQuality: [],
    season: []
  });
  const [spots, setSpots] = useState<SwimmingSpot[]>(initialSpots);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSpot, setNewSpot] = useState<Omit<SwimmingSpot, 'id'>>(defaultNewSpot);
  const [addSpotMode, setAddSpotMode] = useState(false);
  const [pendingSpotCoords, setPendingSpotCoords] = useState<{lat: number, lng: number} | null>(null);

  const filteredSpots = useMemo(() => {
    return spots.filter(spot => {
      if (filters.hasBeach && !spot.hasBeach) return false;
      if (filters.hasDivingTower && !spot.hasDivingTower) return false;
      if (filters.isPaid && !spot.isPaid) return false;
      if (filters.hasChangingRooms && !spot.hasChangingRooms) return false;
      if (filters.hasToilets && !spot.hasToilets) return false;
      if (filters.hasParking && !spot.hasParking) return false;
      if (filters.hasCafe && !spot.hasCafe) return false;
      if (filters.waterQuality.length > 0 && !filters.waterQuality.includes(spot.waterQuality)) return false;
      if (filters.season.length > 0 && !filters.season.includes(spot.season)) return false;
      return true;
    });
  }, [filters, spots]);

  const handleSpotSelect = (spot: SwimmingSpot) => {
    setSelectedSpot(spot);
  };

  const clearFilters = () => {
    setFilters({
      hasBeach: false,
      hasDivingTower: false,
      isPaid: false,
      hasChangingRooms: false,
      hasToilets: false,
      hasParking: false,
      hasCafe: false,
      waterQuality: [],
      season: []
    });
  };

  const handleAddSpot = () => {
    setAddSpotMode(true);
    setShowAddModal(false);
    setPendingSpotCoords(null);
  };

  // Called from Map when user clicks in addSpotMode
  const handleMapClickForAdd = (lat: number, lng: number) => {
    setAddSpotMode(false);
    setPendingSpotCoords({ lat, lng });
    setNewSpot({ ...defaultNewSpot, latitude: lat, longitude: lng });
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
  };

  const handleNewSpotChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setNewSpot((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'latitude' || name === 'longitude'
          ? Number(value)
          : value,
    }));
  };

  const handleAddSpotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpots(prev => [
      ...prev,
      {
        ...newSpot,
        id: uuidv4(),
      }
    ]);
    setShowAddModal(false);
    setNewSpot(defaultNewSpot);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Waves size={24} />
            <h1>Oslo Swimming Spots</h1>
          </div>
          <div className="header-info">
            <span className="spots-count">
              {filteredSpots.length} spots found
            </span>
            <button className="add-spot-btn" onClick={handleAddSpot}>+ Add Spot</button>
            <button className="clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </header>

      {addSpotMode && (
        <div className="add-spot-instructions">
          <div className="add-spot-instructions-inner">
            <strong>Click on the map to choose the new spot location.</strong>
            <button className="close-modal" onClick={() => setAddSpotMode(false)}>&times;</button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal add-spot-modal">
            <button className="close-modal" onClick={handleModalClose}>&times;</button>
            <h2>Add a New Swimming Spot</h2>
            <form onSubmit={handleAddSpotSubmit} className="add-spot-form">
              <label>Name
                <input name="name" value={newSpot.name} onChange={handleNewSpotChange} required />
              </label>
              <label>Description
                <textarea name="description" value={newSpot.description} onChange={handleNewSpotChange} required />
              </label>
              <label>Latitude
                <input name="latitude" type="number" step="any" value={newSpot.latitude} onChange={handleNewSpotChange} required />
              </label>
              <label>Longitude
                <input name="longitude" type="number" step="any" value={newSpot.longitude} onChange={handleNewSpotChange} required />
              </label>
              <div className="form-row">
                <label><input type="checkbox" name="hasBeach" checked={newSpot.hasBeach} onChange={handleNewSpotChange} /> Beach</label>
                <label><input type="checkbox" name="hasDivingTower" checked={newSpot.hasDivingTower} onChange={handleNewSpotChange} /> Diving Tower</label>
                <label><input type="checkbox" name="hasChangingRooms" checked={newSpot.hasChangingRooms} onChange={handleNewSpotChange} /> Changing Rooms</label>
                <label><input type="checkbox" name="hasToilets" checked={newSpot.hasToilets} onChange={handleNewSpotChange} /> Toilets</label>
                <label><input type="checkbox" name="hasParking" checked={newSpot.hasParking} onChange={handleNewSpotChange} /> Parking</label>
                <label><input type="checkbox" name="hasCafe" checked={newSpot.hasCafe} onChange={handleNewSpotChange} /> Cafe</label>
                <label><input type="checkbox" name="isPaid" checked={newSpot.isPaid} onChange={handleNewSpotChange} /> Paid Entry</label>
              </div>
              <label>Water Quality
                <select name="waterQuality" value={newSpot.waterQuality} onChange={handleNewSpotChange}>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </label>
              <label>Season
                <select name="season" value={newSpot.season} onChange={handleNewSpotChange}>
                  <option value="summer">Summer</option>
                  <option value="year-round">Year Round</option>
                  <option value="indoor">Indoor</option>
                </select>
              </label>
              <button type="submit" className="submit-btn">Add Spot</button>
            </form>
          </div>
        </div>
      )}

      <main className="app-main">
        <aside className="sidebar">
          <FilterComponent 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </aside>
        
        <section className="map-section">
          <MapComponent 
            spots={filteredSpots}
            selectedSpot={selectedSpot}
            onSpotSelect={handleSpotSelect}
            onMapClickForAdd={addSpotMode ? handleMapClickForAdd : undefined}
          />
        </section>
        
        {selectedSpot && (
          <aside className="spot-details">
            <div className="spot-details-content">
              <button className="close-details" onClick={() => setSelectedSpot(null)} title="Close">&times;</button>
              <h2>{selectedSpot.name}</h2>
              <p>{selectedSpot.description}</p>
              
              <div className="spot-amenities">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {selectedSpot.hasBeach && <span className="amenity">🏖️ Beach</span>}
                  {selectedSpot.hasDivingTower && <span className="amenity">🏊 Diving Tower</span>}
                  {selectedSpot.hasChangingRooms && <span className="amenity">🚿 Changing Rooms</span>}
                  {selectedSpot.hasToilets && <span className="amenity">🚽 Toilets</span>}
                  {selectedSpot.hasParking && <span className="amenity">🚗 Parking</span>}
                  {selectedSpot.hasCafe && <span className="amenity">☕ Cafe</span>}
                </div>
              </div>
              
              <div className="spot-info">
                <div className="info-item">
                  <strong>Water Quality:</strong>
                  <span className={`quality-badge quality-${selectedSpot.waterQuality}`}>
                    {selectedSpot.waterQuality}
                  </span>
                </div>
                <div className="info-item">
                  <strong>Season:</strong>
                  <span className={`season-badge season-${selectedSpot.season}`}>
                    {selectedSpot.season === 'year-round' ? 'Year Round' : selectedSpot.season}
                  </span>
                </div>
                <div className="info-item">
                  <strong>Entry:</strong>
                  <span className={selectedSpot.isPaid ? 'paid-badge' : 'free-badge'}>
                    {selectedSpot.isPaid ? 'Paid' : 'Free'}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default App; 