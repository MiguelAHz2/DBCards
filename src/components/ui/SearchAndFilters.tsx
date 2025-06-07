import { FC, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  styled,
  alpha,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { 
  FilterList,
  Sort as SortIcon,
  SortByAlpha,
  Speed,
  Category as CategoryIcon,
  Person,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { RACES, CATEGORIES } from '../../utils/constants';
import type { SortConfig, SortCriteria } from '../../interfaces/sorting.interface';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8]
  }
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      }
    }
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  }
}));

const SORT_CRITERIA = [
  { value: '', label: 'Sin ordenar', icon: <SortIcon /> },
  { value: 'name', label: 'Nombre', icon: <SortByAlpha /> },
  { value: 'power', label: 'Poder', icon: <Speed /> },
  { value: 'race', label: 'Raza', icon: <Person /> },
  { value: 'category', label: 'Categoría', icon: <CategoryIcon /> },
] as const;

interface Props {
  onRaceFilter: (race: string | null) => void;
  onCategoryFilter: (category: string | null) => void;
  sortConfig: SortConfig;
  onSortChange: (newConfig: SortConfig) => void;
}

export const SearchAndFilters: FC<Props> = ({
  onRaceFilter,
  onCategoryFilter,
  sortConfig,
  onSortChange,
}) => {
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleRaceChange = (event: SelectChangeEvent) => {
    const race = event.target.value;
    setSelectedRace(race);
    onRaceFilter(race || null);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryFilter(category || null);
  };

  const handleCriteriaChange = (event: SelectChangeEvent) => {
    const newCriteria = event.target.value as SortCriteria;
    onSortChange({
      criteria: newCriteria,
      direction: newCriteria === '' ? 'asc' : sortConfig.direction
    });
  };

  const toggleDirection = () => {
    onSortChange({
      ...sortConfig,
      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <StyledPaper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
      }}>
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
          flex: 1
        }}>
          <StyledFormControl sx={{ minWidth: '200px' }}>
            <InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FilterList fontSize="small" />
                Raza
              </Box>
            </InputLabel>
            <Select
              value={selectedRace}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FilterList fontSize="small" />
                  Raza
                </Box>
              }
              onChange={handleRaceChange}
            >
              <MenuItem value="">
                <em>Todas las razas</em>
              </MenuItem>
              {Object.values(RACES).map((race) => (
                <MenuItem 
                  key={race} 
                  value={race}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {race}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <StyledFormControl sx={{ minWidth: '200px' }}>
            <InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FilterList fontSize="small" />
                Categoría
              </Box>
            </InputLabel>
            <Select
              value={selectedCategory}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FilterList fontSize="small" />
                  Categoría
                </Box>
              }
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>Todas las categorías</em>
              </MenuItem>
              {Object.entries(CATEGORIES).map(([key, value]) => (
                <MenuItem 
                  key={key} 
                  value={value}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Divider sx={{ display: { xs: 'block', md: 'none' } }} />

        <Box sx={{ 
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-end' },
          minWidth: { md: '300px' }
        }}>
          <StyledFormControl size="medium" sx={{ minWidth: '200px' }}>
            <InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SortIcon fontSize="small" />
                Ordenar por
              </Box>
            </InputLabel>
            <Select
              value={sortConfig.criteria}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <SortIcon fontSize="small" />
                  Ordenar por
                </Box>
              }
              onChange={handleCriteriaChange}
            >
              {SORT_CRITERIA.map(({ value, label, icon }) => (
                <MenuItem 
                  key={value} 
                  value={value}
                  sx={{
                    minHeight: 40,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {icon}
                  {label}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          {sortConfig.criteria && (
            <Tooltip 
              title={`Ordenar ${sortConfig.direction === 'asc' ? 'descendente' : 'ascendente'}`}
              arrow
            >
              <IconButton 
                onClick={toggleDirection}
                size="small"
                sx={{ 
                  transition: 'all 0.2s ease-in-out',
                  bgcolor: 'action.hover',
                  '&:hover': {
                    bgcolor: 'action.selected',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {sortConfig.direction === 'asc' ? 
                  <ArrowUpward /> : 
                  <ArrowDownward />
                }
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </StyledPaper>
  );
}; 