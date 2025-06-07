import { Box, AppBar, Toolbar, Typography, Container, IconButton, Tooltip, Stack, alpha } from '@mui/material';
import { Favorite, DarkMode, LightMode, GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';
import { AnimatedBackground } from '../background/AnimatedBackground';
import { NavbarSearch } from '../ui/NavbarSearch';

interface Props {
  children: React.ReactNode;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  onFavoritesClick: () => void;
  showingFavorites?: boolean;
  onSearch: (search: string) => void;
}

export const MainLayout = ({
  children,
  onThemeToggle,
  isDarkMode,
  onFavoritesClick,
  showingFavorites = false,
  onSearch,
}: Props) => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        position: 'relative',
        background: theme => theme.palette.mode === 'dark'
          ? '#121212'
          : '#ffffff',
      }}
    >
      <AnimatedBackground />
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: theme => theme.palette.mode === 'dark'
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: theme => `1px solid ${
            theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)'
          }`,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)'
                : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Dragon Ball Cards
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <NavbarSearch onSearchChange={onSearch} />
          </Box>

          <Stack direction="row" spacing={1}>
            <Tooltip title={showingFavorites ? "Ver todas las cartas" : "Ver favoritos"} arrow>
              <IconButton 
                color={isDarkMode ? "inherit" : "primary"}
                onClick={onFavoritesClick}
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  ...(showingFavorites && {
                    color: theme => theme.palette.mode === 'dark' ? '#FE6B8B' : '#FF8E53',
                    transform: 'scale(1.1)',
                  })
                }}
              >
                <Favorite />
              </IconButton>
            </Tooltip>
            <Tooltip title={isDarkMode ? "Modo claro" : "Modo oscuro"} arrow>
              <IconButton 
                color={isDarkMode ? "inherit" : "primary"}
                onClick={onThemeToggle}
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: theme => alpha(theme.palette.background.paper, 0.5),
          backdropFilter: 'blur(10px)',
          borderTop: theme => `1px solid ${
            theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)'
          }`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack 
            direction="column" 
            spacing={2} 
            alignItems="center"
          >
            <Stack 
              direction="row" 
              spacing={3} 
              justifyContent="center"
              sx={{
                '& a': {
                  color: 'text.secondary',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    color: theme => theme.palette.primary.main,
                  }
                }
              }}
            >
              <Tooltip title="GitHub" arrow>
                <IconButton 
                  component="a" 
                  href="https://github.com/MiguelAHz2" 
                  target="_blank"
                  size="large"
                >
                  <GitHub />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn" arrow>
                <IconButton 
                  component="a" 
                  href="https://linkedin.com/in/miguel-jose-alvarez-henriquez-391144191" 
                  target="_blank"
                  size="large"
                  sx={{
                    color: theme => theme.palette.mode === 'dark' 
                      ? '#0A66C2' 
                      : '#0077B5'
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Tooltip>
              <Tooltip title="WhatsApp" arrow>
                <IconButton 
                  component="a" 
                  href="https://wa.me/573239377429" 
                  target="_blank"
                  size="large"
                  sx={{
                    color: theme => theme.palette.mode === 'dark' 
                      ? '#25D366' 
                      : '#128C7E'
                  }}
                >
                  <WhatsApp />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography 
              variant="body2" 
              align="center"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                letterSpacing: '0.5px',
                '& span': {
                  color: 'primary.main',
                  fontWeight: 'bold'
                }
              }}
            >
              Desarrollado con <span>♥</span> por Miguel Alvarez
            </Typography>
            <Typography 
              variant="caption" 
              align="center"
              sx={{
                color: 'text.disabled',
                mt: -1
              }}
            >
              © {new Date().getFullYear()} Dragon Ball Cards
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}; 