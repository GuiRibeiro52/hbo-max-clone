export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  description: string;
  poster_path: string;
  backdrop_path?: string; 
  vote_average: number;
}

export interface Movie extends MediaItem {
  title: string;
  release_date: string;
  runtime: number; 
}

export interface Serie extends MediaItem {
  name: string;
  first_air_date: string;
  number_of_seasons: number; 
  seasons: Season[]; 
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  episode_count: number;
  air_date?: string;
  episodes?: Episode[]; 
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path?: string; 
  runtime?: number; 
  air_date?: string; 
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface Movie extends MediaItem {
  title: string;
  release_date: string;
  runtime: number; 
}
