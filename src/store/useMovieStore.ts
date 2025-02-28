import {create} from 'zustand';
import api from './api';

interface MovieState {
  nowPlaying: any[];
  popular: any[];
  topRated: any[];
  upcoming: any[];
  loading: {[key: string]: boolean};
  error: {[key: string]: string | null};
  fetchNowPlaying: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchUpcoming: () => Promise<void>;
}

export const useMovieStore = create<MovieState>(set => ({
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
  loading: {},
  error: {},

  fetchNowPlaying: async () => {
    set(state => ({
      loading: {...state.loading, nowPlaying: true},
      error: {...state.error, nowPlaying: null},
    }));
    try {
      const data = await api('movie/now_playing?page=1');
      set(state => ({
        nowPlaying: data.results,
        loading: {...state.loading, nowPlaying: false},
      }));
    } catch (error) {
      set(state => ({
        error: {
          ...state.error,
          nowPlaying: 'Failed to fetch Now Playing movies',
        },
        loading: {...state.loading, nowPlaying: false},
      }));
    }
  },

  fetchPopular: async () => {
    set(state => ({
      loading: {...state.loading, popular: true},
      error: {...state.error, popular: null},
    }));
    try {
      const data = await api('movie/popular?page=1');
      set(state => ({
        popular: data.results,
        loading: {...state.loading, popular: false},
      }));
    } catch (error) {
      set(state => ({
        error: {...state.error, popular: 'Failed to fetch Popular movies'},
        loading: {...state.loading, popular: false},
      }));
    }
  },

  fetchTopRated: async () => {
    console.log('Fetching Top Rated Movies...');
    set(state => ({
      loading: {...state.loading, topRated: true},
      error: {...state.error, topRated: null},
    }));
    try {
      const data = await api('movie/top_rated?page=1');
      console.log('Top Rated Movies:', data);
      set(state => ({
        topRated: data.results,
        loading: {...state.loading, topRated: false},
      }));
    } catch (error) {
      set(state => ({
        error: {...state.error, topRated: 'Failed to fetch Top Rated movies'},
        loading: {...state.loading, topRated: false},
      }));
    }
  },

  fetchUpcoming: async () => {
    console.log('Fetching Upcoming Movies...');
    set(state => ({
      loading: {...state.loading, upcoming: true},
      error: {...state.error, upcoming: null},
    }));
    try {
      const data = await api('movie/upcoming?page=1');
      console.log('Upcoming Movies:', data);
      set(state => ({
        upcoming: data.results,
        loading: {...state.loading, upcoming: false},
      }));
    } catch (error) {
      set(state => ({
        error: {...state.error, upcoming: 'Failed to fetch Upcoming movies'},
        loading: {...state.loading, upcoming: false},
      }));
    }
  },
}));
