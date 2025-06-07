import { FC, useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Zoom,
  styled,
  alpha
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(8px)',
    borderRadius: theme.shape.borderRadius,
    width: '300px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.9),
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      }
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  }
}));

interface Props {
  onSearchChange: (search: string) => void;
}

export const NavbarSearch: FC<Props> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    onSearchChange(newValue);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearchChange('');
  };

  return (
    <StyledTextField
      size="small"
      variant="outlined"
      placeholder="Buscar personaje..."
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="primary" />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <Tooltip title="Limpiar búsqueda" TransitionComponent={Zoom}>
              <IconButton 
                onClick={handleClearSearch} 
                edge="end" 
                size="small"
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Clear />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}; 