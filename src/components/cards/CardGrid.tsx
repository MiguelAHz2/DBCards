import { FC, useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Favorite } from '@mui/icons-material';
import { DragonBallCard } from './DragonBallCard';
import { DragonBallCardSkeleton } from './DragonBallCardSkeleton';
import { SearchAndFilters } from '../ui/SearchAndFilters';
import type { DragonBallCard as DragonBallCardType } from '../../interfaces/card.interface';
import type { SortConfig } from '../../interfaces/sorting.interface';

interface Props {
  cards: DragonBallCardType[];
  favorites?: Set<string>;
  onToggleFavorite?: (id: string) => void;
  title?: string;
  onRaceFilter: (race: string | null) => void;
  onCategoryFilter: (category: string | null) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const CardGrid: FC<Props> = ({
  cards,
  favorites = new Set(),
  onToggleFavorite,
  title = "",
  onRaceFilter,
  onCategoryFilter
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    criteria: '',
    direction: 'asc'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sortedCards = useMemo(() => {
    if (!sortConfig || sortConfig.criteria === '') return cards;
    
    return [...cards].sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.criteria) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'power':
          comparison = a.power - b.power;
          break;
        case 'race':
          comparison = a.race.localeCompare(b.race);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          return 0;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [cards, sortConfig]);

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <Box key={`skeleton-${index}`}>
        <DragonBallCardSkeleton />
      </Box>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {title === "Cartas Favoritas" && (
        <Box
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
            position: 'relative'
          }}
        >
          <Favorite 
            sx={{ 
              color: 'error.main',
              fontSize: '1.8rem',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
                '50%': {
                  transform: 'scale(1.1)',
                  opacity: 1,
                },
              }
            }} 
          />
          <Typography 
            variant="h5" 
            component="h1"
            sx={{ 
              color: 'text.primary',
              fontWeight: 500,
              letterSpacing: '0.5px',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: '100%',
                height: '2px',
                background: theme => `linear-gradient(90deg, 
                  ${alpha(theme.palette.error.main, 0)} 0%,
                  ${theme.palette.error.main} 50%,
                  ${alpha(theme.palette.error.main, 0)} 100%
                )`
              }
            }}
          >
            Favoritos
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <SearchAndFilters
          onRaceFilter={onRaceFilter}
          onCategoryFilter={onCategoryFilter}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
        />
      </Box>

      <AnimatePresence>
        <Box 
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
          sx={{ 
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            }
          }}
        >
          {isLoading ? (
            renderSkeletons()
          ) : sortedCards.length > 0 ? (
            sortedCards.map((card) => (
              <Box 
                key={card.id}
                component={motion.div}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <DragonBallCard
                  card={card}
                  isFavorite={favorites.has(card.id)}
                  onFavorite={onToggleFavorite}
                  isLoading={isLoading}
                />
              </Box>
            ))
          ) : (
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography 
                variant="h6" 
                textAlign="center" 
                color="text.secondary"
                sx={{ mt: 4 }}
              >
                No se encontraron personajes con los filtros seleccionados
              </Typography>
            </Box>
          )}
        </Box>
      </AnimatePresence>
    </Container>
  );
}; 