import { keyframes } from '@mui/material';

export const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 167, 38, 0.2),
                0 0 10px rgba(255, 167, 38, 0.1);
  }
  50% {
    box-shadow: 0 0 10px rgba(255, 167, 38, 0.3),
                0 0 20px rgba(255, 167, 38, 0.2);
  }
`;

export const powerGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 167, 38, 0.4);
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 167, 38, 0.6);
  }
`;

export const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`; 