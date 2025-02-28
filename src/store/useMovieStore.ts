import {create} from 'zustand';
import api from './api';

interface MovieState {
  nowPlaying: any[];
  popular: any[];
  topRated: any[];
  upcoming: any[];
  pageNowPlaying: number;
  pagePopular: number;
  pageTopRated: number;
  pageUpcoming: number;
  loading: {[key: string]: boolean};
  error: {[key: string]: string | null};
  fetchNowPlaying: () => Promise<void>;
  fetchPopular: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchUpcoming: () => Promise<void>;
  fetchMoreNowPlaying: () => Promise<void>;
  fetchMorePopular: () => Promise<void>;
  fetchMoreTopRated: () => Promise<void>;
  fetchMoreUpcoming: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
  pageNowPlaying: 1,
  pagePopular: 1,
  pageTopRated: 1,
  pageUpcoming: 1,
  loading: {},
  error: {},

  fetchNowPlaying: async () => {
    set(state => ({
      loading: {...state.loading, nowPlaying: true},
      error: {...state.error, nowPlaying: null},
    }));
    try {
      const data = await api('movie/now_playing?page=1');
      set({
        nowPlaying: data.results,
        pageNowPlaying: 2,
        loading: {nowPlaying: false},
      });
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
      set({
        popular: data.results,
        pagePopular: 2,
        loading: {popular: false},
      });
    } catch (error) {
      set(state => ({
        error: {...state.error, popular: 'Failed to fetch Popular movies'},
        loading: {...state.loading, popular: false},
      }));
    }
  },

  fetchTopRated: async () => {
    set(state => ({
      loading: {...state.loading, topRated: true},
      error: {...state.error, topRated: null},
    }));
    try {
      const data = await api('movie/top_rated?page=1');
      set({
        topRated: data.results,
        pageTopRated: 2,
        loading: {topRated: false},
      });
    } catch (error) {
      set(state => ({
        error: {...state.error, topRated: 'Failed to fetch Top Rated movies'},
        loading: {...state.loading, topRated: false},
      }));
    }
  },

  fetchUpcoming: async () => {
    set(state => ({
      loading: {...state.loading, upcoming: true},
      error: {...state.error, upcoming: null},
    }));
    try {
      const data = await api('movie/upcoming?page=1');
      set({
        upcoming: data.results,
        pageUpcoming: 2,
        loading: {upcoming: false},
      });
    } catch (error) {
      set(state => ({
        error: {...state.error, upcoming: 'Failed to fetch Upcoming movies'},
        loading: {...state.loading, upcoming: false},
      }));
    }
  },

  fetchMoreNowPlaying: async () => {
    const {pageNowPlaying, nowPlaying} = get();
    try {
      const data = await api(`movie/now_playing?page=${pageNowPlaying}`);
      set({
        nowPlaying: [...nowPlaying, ...data.results],
        pageNowPlaying: pageNowPlaying + 1,
      });
    } catch (error) {
      set(state => ({
        error: {
          ...state.error,
          nowPlaying: 'Failed to fetch more Now Playing movies',
        },
      }));
    }
  },

  fetchMorePopular: async () => {
    const {pagePopular, popular} = get();
    try {
      const data = await api(`movie/popular?page=${pagePopular}`);
      set({
        popular: [...popular, ...data.results],
        pagePopular: pagePopular + 1,
      });
    } catch (error) {
      set(state => ({
        error: {...state.error, popular: 'Failed to fetch more Popular movies'},
      }));
    }
  },

  fetchMoreTopRated: async () => {
    const {pageTopRated, topRated} = get();
    try {
      const data = await api(`movie/top_rated?page=${pageTopRated}`);
      set({
        topRated: [...topRated, ...data.results],
        pageTopRated: pageTopRated + 1,
      });
    } catch (error) {
      set(state => ({
        error: {
          ...state.error,
          topRated: 'Failed to fetch more Top Rated movies',
        },
      }));
    }
  },

  fetchMoreUpcoming: async () => {
    const {pageUpcoming, upcoming} = get();
    try {
      const data = await api(`movie/upcoming?page=${pageUpcoming}`);
      set({
        upcoming: [...upcoming, ...data.results],
        pageUpcoming: pageUpcoming + 1,
      });
    } catch (error) {
      set(state => ({
        error: {
          ...state.error,
          upcoming: 'Failed to fetch more Upcoming movies',
        },
      }));
    }
  },
}));
