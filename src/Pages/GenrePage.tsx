import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre, getSeriesByGenre, getTrending } from '../api/tmdb';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
import { MediaItem } from '../types';

const GenrePage = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [series, setSeries] = useState<MediaItem[]>([]);
  const [randomItem, setRandomItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (genreName) {
      const fetchContent = async () => {
        const moviesData = await getMoviesByGenre(genreName);
        const seriesData = await getSeriesByGenre(genreName);
        const trendingData = await getTrending();
        
        setMovies(moviesData);
        setSeries(seriesData);



        const allItems = [...moviesData, ...seriesData, ...trendingData];
        if (allItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * allItems.length);
          setRandomItem(allItems[randomIndex]);
        }
      };

      fetchContent();
    }
  }, [genreName]);

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
        <Carousel title="Filmes" items={movies} type="movie" />
        <Carousel title="Séries" items={series} type="serie" />
      </div>
    </div>
  );
};

export default GenrePage;
