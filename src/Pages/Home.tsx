import { useEffect, useState } from 'react';
import { getPopularMovies, getPopularSeries, getMarvelMovies } from '../api/tmdb';
import Carousel from '../components/Carousel';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [marvelMovies, setMarvelMovies] = useState([]);

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

    fetchMovies();
    fetchSeries();
    fetchMarvelMovies();
  }, []);

  return (
    <div className="bg-gray-900 text-white pl-4 2xl:pl-20 flex flex-col gap-10 ">
      <Carousel title="Séries em Alta" items={popularSeries} type="serie" />
      <Carousel title="Filmes em Alta" items={popularMovies} type="movie" />
      <Carousel title="Universo Marvel" items={marvelMovies} type="movie" />
    </div>
  );
};

export default Home;
