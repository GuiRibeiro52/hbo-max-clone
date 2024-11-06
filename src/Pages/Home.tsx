// src/pages/Home.tsx
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
      // Vamos criar uma função que busca filmes do universo Marvel (exemplo).
      const marvelData = await getMarvelMovies();
      setMarvelMovies(marvelData);
    };

    fetchMovies();
    fetchSeries();
    fetchMarvelMovies();
  }, []);

  return (
    <div className="home-page bg-gray-900 text-white p-4">
      <Carousel title="Séries em Alta" items={popularSeries} />
      <Carousel title="Filmes em Alta" items={popularMovies} />
      <Carousel title="Universo Marvel" items={marvelMovies} />
    </div>
  );
};

export default Home;
