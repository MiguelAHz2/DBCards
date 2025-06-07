import { FC } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  IconButton,
  SelectChangeEvent,
  Tooltip,
  Paper,
  styled,
  alpha
} from '@mui/material';
import { 
  Sort as SortIcon,
  SortByAlpha,
  Speed,
  Category,
  Person,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
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

interface Props {
  sortConfig: SortConfig;
  onSortChange: (newConfig: SortConfig) => void;
}

const SORT_CRITERIA = [
  { value: '', label: 'Sin ordenar', icon: <SortIcon /> },
  { value: 'name', label: 'Nombre', icon: <SortByAlpha /> },
  { value: 'power', label: 'Poder', icon: <Speed /> },
  { value: 'race', label: 'Raza', icon: <Person /> },
  { value: 'category', label: 'Categoría', icon: <Category /> },
] as const;

export const SortControls: FC<Props> = ({ sortConfig, onSortChange }) => {
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
    <StyledPaper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <StyledFormControl size="small" sx={{ minWidth: 200 }}>
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

        {sortConfig.criteria !== '' && (
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
    </StyledPaper>
  );
}; 