import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { SwimmingSpot } from '../types';
import { Waves, Coffee, Car, Bath } from 'lucide-react';

interface MapProps {
  spots: SwimmingSpot[];
  selectedSpot: SwimmingSpot | null;
  onSpotSelect: (spot: SwimmingSpot) => void;
  onMapClickForAdd?: (lat: number, lng: number) => void;
}

const AddSpotClickHandler: React.FC<{onMapClickForAdd: (lat: number, lng: number) => void}> = ({ onMapClickForAdd }) => {
  useMapEvents({
    click(e) {
      onMapClickForAdd(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

const MapComponent: React.FC<MapProps> = ({ spots, selectedSpot, onSpotSelect, onMapClickForAdd }) => {
  const getMarkerIcon = (spot: SwimmingSpot) => {
    const iconColor = spot.isPaid ? '#ff6b6b' : '#4ecdc4';
    return L.divIcon({
      html: `<div style="
        background-color: ${iconColor};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">🏊</div>`,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const getAmenitiesIcons = (spot: SwimmingSpot) => {
    const amenities = [];
    if (spot.hasBeach) amenities.push(<Waves key="beach" size={14} />);
    if (spot.hasChangingRooms) amenities.push(<Bath key="changing" size={14} />);
    if (spot.hasToilets) amenities.push(<span key="toilets">🚽</span>);
    if (spot.hasParking) amenities.push(<Car key="parking" size={14} />);
    if (spot.hasCafe) amenities.push(<Coffee key="cafe" size={14} />);
    return amenities;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[59.9139, 10.7522]} // Oslo center
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {onMapClickForAdd && <AddSpotClickHandler onMapClickForAdd={onMapClickForAdd} />}
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.latitude, spot.longitude]}
            icon={getMarkerIcon(spot)}
            eventHandlers={{
              click: () => onSpotSelect(spot)
            }}
          >
            <Popup>
              <div className="spot-popup">
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>
                <div className="spot-details">
                  <div className="amenities">
                    {getAmenitiesIcons(spot)}
                  </div>
                  <div className="spot-info">
                    <span className={`quality-badge quality-${spot.waterQuality}`}>
                      {spot.waterQuality}
                    </span>
                    <span className={`season-badge season-${spot.season}`}>
                      {spot.season === 'year-round' ? 'Year Round' : spot.season}
                    </span>
                    {spot.isPaid && <span className="paid-badge">Paid</span>}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent; 