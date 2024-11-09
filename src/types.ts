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
}

export interface Video {
  id: string;
  key: string; 
  site: string; 
  type: string; 
}
