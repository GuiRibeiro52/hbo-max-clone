import { useEffect, useState } from 'react';
import { getPopularMovies, getTrending, getTopRatedMovies, getUpcomingMovies } from '../api/tmdb';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
import { MediaItem } from '../types';

const Movies = () => {
  const [randomMovie, setRandomMovie] = useState<MediaItem | null>(null);
  const [newReleases, setNewReleases] = useState<MediaItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MediaItem[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {

      const newReleasesData = await getTrending();
      setNewReleases(newReleasesData);


      const popularData = await getPopularMovies();
      setPopularMovies(popularData);


      const topRatedData = await getTopRatedMovies();
      setTopRatedMovies(topRatedData);


      const upcomingData = await getUpcomingMovies();
      setUpcomingMovies(upcomingData);


      const allMovies = [...newReleasesData, ...popularData];
      const randomIndex = Math.floor(Math.random() * allMovies.length);
      setRandomMovie(allMovies[randomIndex]);
    };

    fetchMovies();
  }, []);

  return (
    <div className="text-white mx-auto w-auto flex flex-col min-h-screen ">
      {randomMovie && (
        <Banner
          title={randomMovie.title || "Filme Indisponível"}
          description={randomMovie.overview}
          backdrop_path={randomMovie.backdrop_path || ""}
          id={randomMovie.id}
          type="movie"
        />
      )}
      <div className="p-10 bg-gradient-to-b from-black via-purple100 to-black">
        <Carousel title="Lançamentos" items={newReleases} type="movie" />
        <Carousel title="Populares" items={popularMovies} type="movie" />
        <Carousel title="Mais bem avaliados" items={topRatedMovies} type="movie" />
        <Carousel title="Em breve" items={upcomingMovies} type="movie" />
      </div>
    </div>
  );
};

export default Movies;
