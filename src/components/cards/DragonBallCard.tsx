import { FC, useState } from 'react';
import {
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  useTheme,
  alpha,
  styled,
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  FlashOn,
  EmojiEvents,
  Psychology,
  Whatshot,
  Stars
} from '@mui/icons-material';
import { DragonBallCard as DragonBallCardType } from '../../interfaces/card.interface';
import { CharacterDetailModal } from './CharacterDetailModal';
import { StyledCard, PowerIndicator } from './styles/CardStyles';
import { powerGlow } from './styles/CardAnimations';

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

interface Props {
  card: DragonBallCardType;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  isLoading?: boolean;
}

const getShortDescription = (description: string): string => {
  const firstSentence = description.split('.')[0];
  return firstSentence.length > 60 
    ? `${firstSentence.substring(0, 57)}...` 
    : firstSentence;
};

export const DragonBallCard: FC<Props> = ({ 
  card, 
  isFavorite = false, 
  onFavorite,
  isLoading = false 
}) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, name, race, description, power, imageUrl, category } = card;

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onFavorite) {
      onFavorite(id);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const shortDescription = getShortDescription(description);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            className="card-media"
            sx={{
              height: 300,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <PowerIndicator className="power-indicator">
            <FlashOn 
              sx={{ 
                color: theme.palette.warning.main,
                fontSize: 24,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }} 
            />
            <Typography 
              variant="body2"
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.warning.main,
                fontSize: '1.1rem',
                animation: `${powerGlow} 2s ease-in-out infinite`,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {power.toLocaleString()}
            </Typography>
          </PowerIndicator>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
            }}
          >
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                color: isFavorite ? theme.palette.error.main : 'white',
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.15) rotate(5deg)',
                  bgcolor: alpha(theme.palette.background.paper, 0.9),
                  color: isFavorite ? theme.palette.error.light : theme.palette.primary.light,
                },
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>

        <CardContent sx={{ pt: 2 }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            mb: 2,
            flexWrap: 'wrap'
          }}>
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

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.5,
              minHeight: '1.5em',
              gap: 0.5,
              fontStyle: 'italic',
              position: 'relative',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {shortDescription}
          </Typography>
        </CardContent>
      </StyledCard>

      <CharacterDetailModal
        character={card}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}; 