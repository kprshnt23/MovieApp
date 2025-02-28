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
  } = useMovieStore();
  const [activeCategory, setActiveCategory] = useState(1);

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

  useEffect(() => {
    console.log('Now Playing:', nowPlaying);
    console.log('Popular:', popular);
    console.log('Top Rated:', topRated);
    console.log('Upcoming:', upcoming);
  }, [nowPlaying, popular, topRated, upcoming]);

  useEffect(() => {
    fetchMoviesByCategory(activeCategory);
  }, [activeCategory]);

  const getMovies = () => {
    switch (activeCategory) {
      case 1:
        return nowPlaying;
      case 2:
        return popular;
      case 3:
        return topRated;
      case 4:
        return upcoming;
      default:
        return nowPlaying;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar onChangeText={() => {}} value="" />
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
        onEndReached={() => fetchMoviesByCategory(activeCategory)}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
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
