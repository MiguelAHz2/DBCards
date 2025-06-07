import { FC } from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

export const DragonBallCardSkeleton: FC = () => {
  return (
    <Card sx={{ 
      maxWidth: 345,
      height: '100%',
      position: 'relative'
    }}>
      {/* Imagen */}
      <Skeleton 
        variant="rectangular" 
        height={200}
        animation="wave"
        sx={{ bgcolor: 'grey.200' }}
      />
      
      <CardContent>
        {/* Nombre */}
        <Skeleton 
          variant="text" 
          height={32} 
          width="60%" 
          sx={{ mb: 1 }}
        />
        
        {/* Chips de raza y categoría */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
        </Box>

        {/* Descripción */}
        <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" height={20} width="80%" sx={{ mb: 2 }} />

        {/* Nivel de poder */}
        <Skeleton variant="text" height={24} width="40%" sx={{ mb: 1 }} />

        {/* Habilidades */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={90} height={24} />
          <Skeleton variant="rounded" width={70} height={24} />
        </Box>
      </CardContent>
    </Card>
  );
}; 