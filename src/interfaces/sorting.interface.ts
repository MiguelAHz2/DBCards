export type SortCriteria = 'name' | 'power' | 'race' | 'category' | '';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  criteria: SortCriteria;
  direction: SortDirection;
} 