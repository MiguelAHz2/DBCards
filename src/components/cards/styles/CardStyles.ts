import { styled, Card, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { glowAnimation } from './CardAnimations';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 14px 28px ${alpha(theme.palette.primary.main, 0.2)},
                0 10px 10px ${alpha(theme.palette.primary.main, 0.15)}`,
    '& .card-media': {
      transform: 'scale(1.1)',
    },
    '& .power-indicator': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    animation: `${glowAnimation} 2s ease-in-out infinite`,
    pointerEvents: 'none',
  },
}));

export const PowerIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  padding: '4px 8px',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  transform: 'translateX(-120%)',
  opacity: 0,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
})); 