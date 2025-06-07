import { createTheme, PaletteMode } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: '#FF6D00', // Naranja intenso de Dragon Ball
      light: '#FF9E40',
      dark: '#E65100',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#FFC107', // Dorado de las esferas
      light: '#FFD54F',
      dark: '#FFA000',
      contrastText: '#000000'
    },
    background: {
      default: mode === 'light' 
        ? '#FFF8E1' // Fondo crema cálido en modo claro
        : '#1A1A1A', // Fondo oscuro más cálido
      paper: mode === 'light' 
        ? '#FFFFFF' 
        : '#262626', // Gris más cálido para las tarjetas
    },
    text: {
      primary: mode === 'light' ? '#212121' : '#FFFFFF',
      secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: mode === 'light' ? '#E65100' : '#FF9E40',
    },
    h2: {
      fontWeight: 600,
      color: mode === 'light' ? '#E65100' : '#FF9E40',
    },
    h3: {
      fontWeight: 600,
      color: mode === 'light' ? '#E65100' : '#FF9E40',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
          backgroundImage: mode === 'light'
            ? 'radial-gradient(circle at top right, rgba(255, 167, 38, 0.15), transparent 70%), radial-gradient(circle at bottom left, rgba(255, 193, 7, 0.1), transparent 70%)'
            : 'radial-gradient(circle at top right, rgba(255, 167, 38, 0.1), transparent 70%), radial-gradient(circle at bottom left, rgba(255, 193, 7, 0.05), transparent 70%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 8px 16px rgba(255, 109, 0, 0.1), 0 2px 4px rgba(255, 109, 0, 0.08)'
            : '0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          backgroundColor: mode === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(38, 38, 38, 0.9)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0 12px 20px rgba(255, 109, 0, 0.15), 0 3px 6px rgba(255, 109, 0, 0.1)'
              : '0 12px 20px rgba(0, 0, 0, 0.4), 0 3px 6px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          backgroundColor: mode === 'light'
            ? 'rgba(255, 109, 0, 0.1)'
            : 'rgba(255, 158, 64, 0.1)',
          '&:hover': {
            backgroundColor: mode === 'light'
              ? 'rgba(255, 109, 0, 0.2)'
              : 'rgba(255, 158, 64, 0.2)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: mode === 'light'
              ? 'rgba(255, 109, 0, 0.1)'
              : 'rgba(255, 158, 64, 0.1)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          backgroundColor: mode === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(38, 38, 38, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode));
}; 