export interface SwimmingSpot {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  hasBeach: boolean;
  hasDivingTower: boolean;
  isPaid: boolean;
  hasChangingRooms: boolean;
  hasToilets: boolean;
  hasParking: boolean;
  hasCafe: boolean;
  waterQuality: 'excellent' | 'good' | 'fair' | 'poor';
  season: 'summer' | 'year-round' | 'indoor';
  imageUrl?: string;
}

export interface FilterOptions {
  hasBeach: boolean;
  hasDivingTower: boolean;
  isPaid: boolean;
  hasChangingRooms: boolean;
  hasToilets: boolean;
  hasParking: boolean;
  hasCafe: boolean;
  waterQuality: string[];
  season: string[];
} 