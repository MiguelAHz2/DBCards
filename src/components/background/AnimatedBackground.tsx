import { Box, keyframes, styled } from '@mui/material';

const float = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(100px, -100px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(200px, 0) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(100px, 100px) rotate(270deg) scale(1.1);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 25px rgba(255, 152, 0, 0.4),
                0 0 50px rgba(255, 193, 7, 0.3),
                0 0 75px rgba(255, 152, 0, 0.2),
                inset 0 0 30px rgba(255, 193, 7, 0.4);
    opacity: 0.9;
  }
  50% {
    box-shadow: 0 0 50px rgba(255, 193, 7, 0.6),
                0 0 100px rgba(255, 152, 0, 0.4),
                0 0 150px rgba(255, 193, 7, 0.3),
                inset 0 0 60px rgba(255, 152, 0, 0.5);
    opacity: 0.7;
  }
`;

const DragonBall = styled(Box)(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at 30% 30%, #FFA726, #F57C00)'
    : 'radial-gradient(circle at 30% 30%, #FFB74D, #FB8C00)',
  position: 'absolute',
  animation: `${float} 8s ease-in-out infinite, ${glow} 4s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at 30% 30%, rgba(255, 167, 38, 0.4), transparent)'
      : 'radial-gradient(circle at 30% 30%, rgba(255, 183, 77, 0.4), transparent)',
    filter: 'blur(4px)',
  }
}));

const Star = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '12px',
  height: '12px',
  background: theme.palette.mode === 'dark' ? '#FFE082' : '#FFFFFF',
  borderRadius: '50%',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 10px rgba(255, 238, 88, 0.8), 0 0 20px rgba(255, 238, 88, 0.4)'
    : '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 167, 38, 0.4)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    background: theme.palette.mode === 'dark'
      ? 'rgba(255, 238, 88, 0.9)'
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    filter: 'blur(1px)',
  }
}));

const BackgroundContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: 0,
  background: theme.palette.mode === 'dark' 
    ? 'radial-gradient(circle at top right, rgba(255, 167, 38, 0.15) 0%, rgba(18, 18, 18, 0) 70%)'
    : 'radial-gradient(circle at top right, rgba(255, 167, 38, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at bottom left, rgba(255, 167, 38, 0.15) 0%, transparent 70%)'
      : 'radial-gradient(circle at bottom left, rgba(255, 167, 38, 0.25) 0%, transparent 70%)',
  },
}));

// Configuración de las estrellas para cada esfera
const getStarPositions = (count: number) => {
  const positions = [];
  const centerX = 50;
  const centerY = 50;
  const radius = 25; // Radio del círculo donde se colocarán las estrellas

  if (count === 1) {
    return [{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }];
  }

  for (let i = 0; i < count; i++) {
    const angle = (360 / count) * i;
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    positions.push({
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
    });
  }

  return positions;
};

const dragonBallPositions = [
  { top: '5%', left: '5%', delay: 0, scale: 1.2, stars: 1 },
  { top: '15%', right: '25%', delay: 1, scale: 0.9, stars: 2 },
  { top: '65%', left: '15%', delay: 2, scale: 1.1, stars: 3 },
  { top: '45%', right: '10%', delay: 3, scale: 1, stars: 4 },
  { top: '35%', left: '60%', delay: 4, scale: 1.3, stars: 5 },
  { top: '75%', right: '20%', delay: 5, scale: 0.8, stars: 6 },
  { top: '25%', left: '35%', delay: 6, scale: 1.4, stars: 7 },
];

export const AnimatedBackground = () => {
  return (
    <BackgroundContainer>
      {dragonBallPositions.map((position, index) => (
        <DragonBall
          key={index}
          sx={{
            ...position,
            animationDelay: `${position.delay}s`,
            opacity: theme => theme.palette.mode === 'dark' ? 0.8 : 0.6,
            transform: `scale(${position.scale})`,
            animation: `${float} ${12 + position.delay}s ease-in-out infinite`,
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {getStarPositions(position.stars).map((starPos, starIndex) => (
              <Star
                key={starIndex}
                sx={{
                  ...starPos,
                  width: `${14 - position.stars}px`,
                  height: `${14 - position.stars}px`,
                }}
              />
            ))}
          </Box>
        </DragonBall>
      ))}
    </BackgroundContainer>
  );
}; 