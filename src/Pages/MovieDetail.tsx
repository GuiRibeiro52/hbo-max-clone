import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';
import { Movie } from '../types';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 text-white bg-gray-900">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="text-lg my-4">{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );
};

export default MovieDetail;
