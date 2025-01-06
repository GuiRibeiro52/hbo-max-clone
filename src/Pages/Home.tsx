import { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries, getMarvelMovies, getTrending, getStarWarsMovies, getHarryPotterMovies } from '../api/tmdb';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
import { MediaItem } from '../types'; 

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
  const [popularSeries, setPopularSeries] = useState<MediaItem[]>([]);
  const [marvelMovies, setMarvelMovies] = useState<MediaItem[]>([]);
  const [starWarsMovies, setStarWarsMovies] = useState<MediaItem[]>([]);
  const [harryPotterMovies, setHarryPotterMovies] = useState<MediaItem[]>([]);
  const [trending, setTrending] = useState<MediaItem[]>([]); 
  const [randomItem, setRandomItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getPopularMovies();
      setPopularMovies(moviesData);
    };

    const fetchSeries = async () => {
      const seriesData = await getPopularSeries();
      setPopularSeries(seriesData);
    };

    const fetchMarvelMovies = async () => {
      const marvelData = await getMarvelMovies();
      setMarvelMovies(marvelData);
    };

    const fetchStarWarsMovies = async () => {
      const starWarsData = await getStarWarsMovies();
      setStarWarsMovies(starWarsData);
    };

    const fetchHarryPotterMovies = async () => {
      const harryPotterData = await getHarryPotterMovies();
      setHarryPotterMovies(harryPotterData);
    };

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };

    fetchMovies();
    fetchSeries();
    fetchMarvelMovies();
    fetchStarWarsMovies();
    fetchTrending();
    fetchHarryPotterMovies();
  }, []);

  useEffect(() => {
    
    const allItems = [...trending, ...popularMovies, ...popularSeries];
    if (allItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * allItems.length);
      setRandomItem(allItems[randomIndex]);
    }
  }, [trending, popularMovies, popularSeries]);

  return (
    <div className="text-white mx-auto flex flex-col min-h-screen ">
      {randomItem && (
        <Banner
        title={randomItem.title || randomItem.name || "Título indisponível"}
        description={randomItem.overview}
        backdrop_path={randomItem.backdrop_path || ""}
        id={randomItem.id}
        type={randomItem.title ? "movie" : "serie"}
      />
      
      )}
      
      <div className="p-10 bg-gradient-to-b from-black via-purple100 to-black">
        <Carousel title="Tendências da Semana" items={trending} type="movie" isLarge={true} />        
        <Carousel title="Séries em Alta" items={popularSeries} type="serie" />
        <Carousel title="Filmes em Alta" items={popularMovies} type="movie" />
        <Carousel title="Universo Marvel" items={marvelMovies} type="movie" />
        <Carousel title="Universo Star Wars" items={starWarsMovies} type="movie" />
        <Carousel title="Universo Harry Potter" items={harryPotterMovies} type="movie" />
      </div>
    </div>
  );
  
};

export default Home;
