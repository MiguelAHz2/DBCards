import { useMemo } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { MainLayout } from './components/layout/MainLayout'
import { CardGrid } from './components/cards/CardGrid'
import type { DragonBallCard } from './interfaces/card.interface'
import { images } from './assets/images'
import { useFavorites } from './hooks/useFavorites'
import { useFilters } from './hooks/useFilters'
import { useThemeMode } from './hooks/useThemeMode'
import { createAppTheme } from './theme/theme'

// Datos de ejemplo (después los obtendremos de una API)
const mockCards: DragonBallCard[] = [
  {
    id: '1',
    name: 'Goku',
    race: 'Saiyan',
    description: 'Criado en la Tierra como Son Goku, este guerrero Saiyan representa la esencia pura del espíritu de lucha. Su increíble capacidad de superación y su corazón bondadoso lo han llevado a convertirse en el protector más poderoso de la Tierra. A pesar de su naturaleza pacífica, su sangre Saiyan lo impulsa a buscar oponentes cada vez más fuertes, llevándolo a alcanzar niveles de poder legendarios.',
    power: 9000,
    imageUrl: images.goku,
    category: 'hero',
    abilities: ['Kamehameha', 'Genkidama', 'Kaio-ken'],
    transformations: ['Super Saiyan', 'Super Saiyan Blue']
  },
  {
    id: '2',
    name: 'Vegeta',
    race: 'Saiyan',
    description: 'El orgulloso príncipe de los Saiyans, cuya evolución de villano a héroe es una de las más memorables. Su inquebrantable determinación y su feroz orgullo lo impulsan a superar constantemente sus límites. Aunque inicialmente fue un enemigo despiadado, su rivalidad con Goku y el amor por su familia en la Tierra lo transformaron en uno de los defensores más leales del planeta.',
    power: 8500,
    imageUrl: images.vegeta,
    category: 'hero',
    abilities: ['Final Flash', 'Big Bang Attack', 'Galick Gun']
  },
  {
    id: '3',
    name: 'Freezer',
    race: 'Frieza Race',
    description: 'El tirano intergaláctico más temido del universo, responsable de la destrucción del planeta Vegeta y casi toda la raza Saiyan. Su capacidad de transformación y su crueldad innata lo convierten en uno de los villanos más peligrosos. A pesar de sus múltiples derrotas, su determinación por la venganza y el poder lo mantienen como una amenaza constante.',
    power: 12000,
    imageUrl: images.freezer,
    category: 'villain',
    abilities: ['Death Beam', 'Death Ball', 'Nova Strike'],
    transformations: ['Final Form', 'Golden Form']
  },
  {
    id: '4',
    name: 'Piccolo',
    race: 'Namekian',
    description: 'Nacido como la reencarnación del Rey Demonio Piccolo, su evolución lo llevó de ser un temible villano a convertirse en el mentor más sabio de los Guerreros Z. Su profundo vínculo con Gohan y su sacrificio desinteresado por proteger la Tierra demuestran su extraordinaria transformación interior. Su sabiduría táctica y capacidad estratégica lo hacen invaluable en cada batalla.',
    power: 3500,
    imageUrl: images.piccolo,
    category: 'hero',
    abilities: ['Special Beam Cannon', 'Light Grenade', 'Hellzone Grenade'],
    transformations: ['Fusion with Nail', 'Fusion with Kami']
  },
  {
    id: '5',
    name: 'Cell',
    race: 'Android',
    description: 'La creación definitiva del Dr. Gero, un bio-androide diseñado con el ADN de los guerreros más poderosos. Su búsqueda de la perfección lo llevó a absorber a los androides 17 y 18, alcanzando un poder extraordinario. Su inteligencia superior y su capacidad de aprender las técnicas de sus componentes genéticos lo convierten en un adversario formidable y adaptable.',
    power: 9000,
    imageUrl: images.cell,
    category: 'villain',
    abilities: ['Kamehameha', 'Solar Kamehameha', 'Cell Jr. Creation'],
    transformations: ['Imperfect Form', 'Semi-Perfect Form', 'Perfect Form']
  },
  {
    id: '6',
    name: 'Gohan',
    race: 'Saiyan Hybrid',
    description: 'El primogénito de Goku, quien posee un potencial de combate que supera incluso al de su padre. Su naturaleza pacífica y su dedicación al estudio contrastan con su increíble poder oculto, que se desata en momentos de extrema necesidad. Su transformación contra Cell marcó un hito en la historia de los guerreros Z, demostrando el verdadero alcance de su poder.',
    power: 8000,
    imageUrl: images.gohan,
    category: 'hero',
    abilities: ['Masenko', 'Father-Son Kamehameha', 'Ultimate Kamehameha'],
    transformations: ['Super Saiyan', 'Super Saiyan 2', 'Ultimate Form']
  },
  {
    id: '7',
    name: 'Majin Buu',
    race: 'Majin',
    description: 'Una entidad mágica ancestral de poder inconmensurable, capaz de destruir galaxias enteras. Su naturaleza cambiante y sus múltiples transformaciones lo hacen impredecible. Desde su forma malvada original hasta su versión más pura e inocente, Majin Buu representa la dualidad entre la destrucción absoluta y la posibilidad de redención.',
    power: 11000,
    imageUrl: images.buu,
    category: 'villain',
    abilities: ['Chocolate Beam', 'Human Extinction Attack', 'Planet Burst'],
    transformations: ['Fat Buu', 'Super Buu', 'Kid Buu']
  },
  {
    id: '8',
    name: 'Trunks',
    race: 'Saiyan Hybrid',
    description: 'El guerrero del futuro, hijo de Vegeta y Bulma, quien viajó al pasado para advertir sobre la amenaza de los androides. Su determinación por salvar no solo su línea temporal sino también el pasado lo convirtió en un héroe crucial. Su dominio de la espada y su transformación en Super Saiyan a una edad temprana demuestran su excepcional talento como guerrero.',
    power: 7500,
    imageUrl: images.trunks,
    category: 'hero',
    abilities: ['Burning Attack', 'Heat Dome Attack', 'Sword of Hope'],
    transformations: ['Super Saiyan', 'Super Saiyan 2']
  },
  {
    id: '9',
    name: 'Android 17',
    race: 'Android',
    description: 'Un androide creado por el Dr. Gero que trascendió su programación original. Después de su conflicto inicial con los Guerreros Z, encontró un propósito como guardián de la naturaleza en una isla remota. Su poder infinito y su personalidad despreocupada pero responsable lo convierten en un aliado invaluable, especialmente durante el Torneo del Poder.',
    power: 7800,
    imageUrl: images.android17,
    category: 'hero',
    abilities: ['Barrier', 'Photon Flash', 'Super Electric Strike']
  },
  {
    id: '10',
    name: 'Broly',
    race: 'Saiyan',
    description: 'El legendario Super Saiyan, nacido con un poder tan monstruoso que aterrorizó al Rey Vegeta. Su ira incontrolable y su poder en constante crecimiento lo convierten en uno de los guerreros más temibles del universo. A pesar de su naturaleza salvaje, su historia trágica revela a un guerrero manipulado y aislado desde su nacimiento.',
    power: 13000,
    imageUrl: images.broly,
    category: 'villain',
    abilities: ['Eraser Cannon', 'Gigantic Roar', 'Omega Blaster'],
    transformations: ['Super Saiyan', 'Legendary Super Saiyan']
  },
  {
    id: '11',
    name: 'Hit',
    race: 'Unknown',
    description: 'El legendario asesino del Universo 6, con más de mil años de experiencia en combate. Su habilidad única para manipular el tiempo, combinada con su técnica de asesinato perfeccionada durante siglos, lo hace prácticamente invencible. Su código de honor y su evolución durante el combate revelan a un guerrero que va más allá de ser un simple asesino.',
    power: 9500,
    imageUrl: images.hit,
    category: 'neutral',
    abilities: ['Time Skip', 'Time Cage', 'Death Blow']
  },
  {
    id: '12',
    name: 'Jiren',
    race: 'Unknown',
    description: 'El guerrero más poderoso del Universo 11, conocido como "El Gris". Su trágico pasado forjó una filosofía basada en la fuerza absoluta y la soledad. Su poder trasciende incluso al de los dioses de la destrucción, y su capacidad para superar cualquier técnica lo convierte en el rival más formidable que los guerreros Z han enfrentado.',
    power: 15000,
    imageUrl: images.jiren,
    category: 'neutral',
    abilities: ['Power Impact', 'Power Rush', 'Meditation'],
    transformations: ['Full Power']
  }
]

function App() {
  const { favorites, toggleFavorite } = useFavorites();
  const { 
    filters: { searchTerm, selectedRace, selectedCategory, showFavorites },
    updateSearchTerm,
    updateRaceFilter,
    updateCategoryFilter,
    setShowFavorites
  } = useFilters();
  const { mode, toggleTheme, isDarkMode } = useThemeMode();

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  const filteredCards = useMemo(() => {
    let result = [...mockCards];

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(card => 
        card.name.toLowerCase().includes(searchLower)
      );
    }

    // Aplicar filtro de raza
    if (selectedRace) {
      result = result.filter(card => card.race === selectedRace);
    }

    // Aplicar filtro de categoría
    if (selectedCategory) {
      result = result.filter(card => card.category === selectedCategory);
    }

    // Aplicar filtro de favoritos
    if (showFavorites) {
      result = result.filter(card => favorites.has(card.id));
      // Si no hay favoritos, mostramos un mensaje pero mantenemos el estado
      if (result.length === 0) {
        return [];
      }
    }

    return result;
  }, [searchTerm, selectedRace, selectedCategory, showFavorites, favorites]);

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    // Si estamos viendo favoritos y quitamos el último, volvemos a mostrar todas las cartas
    if (showFavorites && favorites.size === 1 && favorites.has(id)) {
      setShowFavorites(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout 
        onFavoritesClick={handleFavoritesClick}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        showingFavorites={showFavorites}
        onSearch={updateSearchTerm}
      >
        <CardGrid
          cards={filteredCards}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          title={showFavorites ? "Cartas Favoritas" : ""}
          onRaceFilter={updateRaceFilter}
          onCategoryFilter={updateCategoryFilter}
        />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
