import { useLocalStorage } from './useLocalStorage';
import { PaletteMode } from '@mui/material';

export function useThemeMode() {
  const [mode, setMode] = useLocalStorage<PaletteMode>('dbcards-theme', 'light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return {
    mode,
    toggleTheme,
    isDarkMode: mode === 'dark'
  };
} 