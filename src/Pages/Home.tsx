import { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries, getMarvelMovies, getTrending } from '../api/tmdb';
import Carousel from '../components/Carousel';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [marvelMovies, setMarvelMovies] = useState([]);
  const [trending, setTrending] = useState([]); 

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

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };

    fetchMovies();
    fetchSeries();
    fetchMarvelMovies();
    fetchTrending();
  }, []);

  return (
    <div className="bg-gray-900 text-white pl-4 2xl:pl-20 flex flex-col gap-10 ">
      <Carousel title="Tendências da Semana" items={trending} type="movie" isLarge={true} />
      <Carousel title="Séries em Alta" items={popularSeries} type="serie" />
      <Carousel title="Filmes em Alta" items={popularMovies} type="movie" />
      <Carousel title="Universo Marvel" items={marvelMovies} type="movie" />
    </div>
  );
};

export default Home;
