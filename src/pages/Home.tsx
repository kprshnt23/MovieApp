import {useEffect, useState} from 'react';
import {useMovieStore} from '../store/useMovieStore';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header, SearchBar, Categories} from '../components';
import Feather from 'react-native-vector-icons/Feather';

interface MovieCardProps {
  movie: any;
  onPress: (movie: any) => void;
}

const Home: React.FC = () => {
  const {
    nowPlaying,
    popular,
    topRated,
    upcoming,
    loading,
    error,
    fetchNowPlaying,
    fetchPopular,
    fetchTopRated,
    fetchUpcoming,
    fetchMoreNowPlaying,
    fetchMorePopular,
    fetchMoreTopRated,
    fetchMoreUpcoming,
  } = useMovieStore();

  const [activeCategory, setActiveCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMoviesByCategory = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        fetchNowPlaying();
        break;
      case 2:
        fetchPopular();
        break;
      case 3:
        fetchTopRated();
        break;
      case 4:
        fetchUpcoming();
        break;
      default:
        fetchNowPlaying();
    }
  };

  const fetchMoreMovies = () => {
    switch (activeCategory) {
      case 1:
        fetchMoreNowPlaying();
        break;
      case 2:
        fetchMorePopular();
        break;
      case 3:
        fetchMoreTopRated();
        break;
      case 4:
        fetchMoreUpcoming();
        break;
    }
  };

  useEffect(() => {
    fetchMoviesByCategory(activeCategory);
  }, [activeCategory]);

  const getMovies = () => {
    let movies = [];
    switch (activeCategory) {
      case 1:
        movies = nowPlaying;
        break;
      case 2:
        movies = popular;
        break;
      case 3:
        movies = topRated;
        break;
      case 4:
        movies = upcoming;
        break;
      default:
        movies = nowPlaying;
    }
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onChangeText={setSearchQuery} value={searchQuery} />
      <Categories
        activeIndex={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <FlatList
        data={getMovies()}
        style={{flex: 1}}
        renderItem={({item}) => (
          <MovieCard movie={item} onPress={movie => console.log(movie)} />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        onEndReached={fetchMoreMovies}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({movie, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(movie)}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
      </View>
      <TouchableOpacity style={styles.favoriteIcon} onPress={() => {}}>
        <Feather name="heart" size={24} color={'#E63946'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 200,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 16,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 6,
    borderRadius: 50,
  },
});

export default Home;
