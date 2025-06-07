export const RACES = {
  SAIYAN: 'Saiyan',
  HUMAN: 'Human',
  NAMEKIAN: 'Namekian',
  ANDROID: 'Android',
  MAJIN: 'Majin',
  FRIEZA_RACE: 'Frieza Race',
  SAIYAN_HYBRID: 'Saiyan Hybrid',
  UNKNOWN: 'Unknown'
} as const;

export const CATEGORIES = {
  HERO: 'hero',
  VILLAIN: 'villain',
  NEUTRAL: 'neutral',
} as const;

export const API_ENDPOINTS = {
  BASE_URL: 'https://tu-api-dragon-ball.com', // Esto lo cambiaremos cuando tengamos la API real
  CHARACTERS: '/characters',
  TRANSFORMATIONS: '/transformations',
} as const; 