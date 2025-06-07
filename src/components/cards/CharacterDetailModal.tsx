import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  styled,
  useTheme,
  alpha,
  Fade,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  Close,
  EmojiEvents,
  Psychology,
  Whatshot,
  FlashOn,
  Stars,
  Security,
  Speed,
  Bolt,
} from '@mui/icons-material';
import { DragonBallCard } from '../../interfaces/card.interface';

interface DetailChipProps {
  color?: 'primary' | 'success' | 'error' | 'default';
}

const DetailChip = styled(Chip)<DetailChipProps>(({ theme, color = 'default' }) => {
  const colors = {
    primary: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.9)} 0%, ${alpha(theme.palette.warning.light, 0.95)} 100%)`,
    success: `linear-gradient(135deg, ${alpha('#00C853', 0.9)} 0%, ${alpha('#69F0AE', 0.95)} 100%)`,
    error: `linear-gradient(135deg, ${alpha('#D50000', 0.9)} 0%, ${alpha('#FF5252', 0.95)} 100%)`,
    default: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.light, 0.95)} 100%)`,
  };

  return {
    margin: theme.spacing(0.5),
    '& .MuiChip-icon': {
      color: 'inherit',
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 'bold',
    border: 'none',
    background: colors[color],
    color: '#FFFFFF',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    },
  };
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    backgroundImage: 'none',
    overflow: 'hidden',
    margin: theme.spacing(2),
    maxWidth: '800px',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '400px',
  width: '100%',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: `linear-gradient(to bottom, 
      ${alpha(theme.palette.background.default, 0)} 0%, 
      ${alpha(theme.palette.background.default, 0.8)} 40%, 
      ${theme.palette.background.default} 100%)`,
  },
}));

const CharacterImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.warning.main, 0.1)} 0%, 
    ${alpha(theme.palette.warning.light, 0.15)} 100%)`,
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
  boxShadow: `0 4px 12px ${alpha(theme.palette.warning.main, 0.15)}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.warning.main, 0.25)}`,
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.warning.main, 0.15)} 0%, 
      ${alpha(theme.palette.warning.light, 0.2)} 100%)`,
  },
}));

interface Props {
  character: DragonBallCard | null;
  open: boolean;
  onClose: () => void;
}

export const CharacterDetailModal: FC<Props> = ({
  character,
  open,
  onClose,
}) => {
  const theme = useTheme();

  if (!character) return null;

  const {
    name,
    race,
    description,
    power,
    category,
    abilities,
    transformations = [],
  } = character;

  const categoryColor = {
    hero: 'success',
    villain: 'error',
    neutral: 'primary',
  }[category.toLowerCase()] as 'success' | 'error' | 'primary';

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'hero':
        return <Whatshot />;
      case 'villain':
        return <Psychology />;
      default:
        return <Stars />;
    }
  };

  const powerLevel = power >= 10000 ? 'Alto' : power >= 5000 ? 'Medio' : 'Bajo';
  const powerColor = {
    Alto: theme.palette.error.main,
    Medio: theme.palette.warning.main,
    Bajo: theme.palette.success.main,
  }[powerLevel];

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(4px)',
          zIndex: 1,
          color: 'white',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            transform: 'rotate(90deg)',
          },
        }}
      >
        <Close />
      </IconButton>

      <ImageContainer>
        <CharacterImage src={character.imageUrl} alt={name} />
        <Box
          sx={{
            position: 'absolute',
            bottom: theme.spacing(3),
            left: theme.spacing(3),
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DetailChip
              icon={<EmojiEvents />}
              label={race}
              color="primary"
            />
            <DetailChip
              icon={getCategoryIcon()}
              label={category}
              color={categoryColor}
            />
          </Box>
        </Box>
      </ImageContainer>

      <DialogContent sx={{ pt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: theme.palette.warning.main,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                }
              }}
            >
              <Stars /> Historia del Personaje
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'justify',
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(8px)',
                padding: theme.spacing(3),
                borderRadius: theme.spacing(2),
                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                boxShadow: `0 4px 12px ${alpha(theme.palette.warning.main, 0.1)}`,
                position: 'relative',
                fontStyle: 'italic'
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <StatBox>
                <FlashOn 
                  sx={{ 
                    color: powerColor,
                    fontSize: 28,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }} 
                />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Nivel de Poder
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: powerColor, 
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {power.toLocaleString()}
                  </Typography>
                </Box>
              </StatBox>
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <StatBox>
                <Security 
                  sx={{ 
                    color: theme.palette.warning.main,
                    fontSize: 28,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }} 
                />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Categoría
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: theme.palette.warning.main, 
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {category}
                  </Typography>
                </Box>
              </StatBox>
            </Box>
          </Box>

          {transformations.length > 0 && (
            <Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: theme.palette.warning.main,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  mb: 2,
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  }
                }}
              >
                <Speed /> Transformaciones
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {transformations.map((transform, index) => (
                  <Fade in key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div>
                      <DetailChip
                        label={transform}
                        color="primary"
                      />
                    </div>
                  </Fade>
                ))}
              </Box>
            </Box>
          )}

          <Box>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: theme.palette.warning.main,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                }
              }}
            >
              <Bolt /> Habilidades
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {abilities.map((ability, index) => (
                <Fade in key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                  <div>
                    <DetailChip
                      label={ability}
                      color="primary"
                    />
                  </div>
                </Fade>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}; 