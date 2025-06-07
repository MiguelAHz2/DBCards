import { useState, useEffect } from 'react';

type SetConstructor = new <T>(values?: readonly T[] | null) => Set<T>;

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Función para manejar la conversión de Set a/desde JSON
  const parseItem = (item: string | null): T => {
    if (!item) return initialValue;
    
    const parsed = JSON.parse(item);
    
    // Si el valor inicial es un Set, convertimos el array parseado de vuelta a Set
    if (initialValue instanceof Set) {
      return new Set(parsed) as T;
    }
    
    return parsed;
  };

  // Obtenemos el valor inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return parseItem(item);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Actualizamos localStorage cuando el valor cambia
  useEffect(() => {
    try {
      // Si es un Set, lo convertimos a array para almacenarlo
      const valueToStore = storedValue instanceof Set 
        ? Array.from(storedValue)
        : storedValue;
      
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
} 