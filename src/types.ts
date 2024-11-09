
export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string; 
  vote_average: number;
}


export interface Movie extends MediaItem {
  title: string;
  release_date: string;
}


export interface Serie extends MediaItem {
  name: string;
  first_air_date: string;
}
