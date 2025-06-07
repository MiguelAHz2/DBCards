export interface DragonBallCard {
  id: string;
  name: string;
  race: string;
  description: string;
  power: number;
  imageUrl: string;
  category: 'hero' | 'villain' | 'neutral';
  abilities: string[];
  transformations?: string[];
} 