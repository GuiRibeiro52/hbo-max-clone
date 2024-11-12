import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import tmdb from '../api/tmdb';
import Carousel from '../components/Carousel';
import { Movie, Video } from '../types';

Modal.setAppElement('#root');

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}/similar`);
        setSimilarMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes similares:', error);
      }
    };

    fetchMovieDetails();
    fetchSimilarMovies();
  }, [id]);

  const handlePlay = async () => {
    try {
      const response = await tmdb.get(`/movie/${id}/videos`);
      const trailer = response.data.results.find(
        (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setIsModalOpen(true);
      } else {
        console.error("Trailer não encontrado.");
      }
    } catch (error) {
      console.error('Erro ao buscar trailer:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerUrl(null);
  };

  if (!movie) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="text-white min-h-screen ">
      <div
        className="relative h-[600px] w-full bg-cover bg-center "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-black" />
          <div className="absolute bottom-16 left-10 text-white w-[741px] z-10 ml-32">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <p className="text-lg font-semibold mb-4">Filme</p>
            <p className="text-lg mb-4">
              {movie.release_date?.slice(0, 4)} • {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
            </p>
            <p className="text-lg mb-6 ">{movie.overview}</p>
            <div className="flex gap-4">
              <button
                onClick={handlePlay}
                className="flex items-center text-black font-semibold py-2 px-4 rounded-lg"                >
                <img src="/src/assets/images/play.svg" alt="Play" className="w-16 h-16 mr-2" />
              </button>
            </div>
          </div>
      </div>

      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Trailer"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
      >
        <div className="relative w-full max-w-3xl h-[500px]">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title="Trailer"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <p className="text-white">Trailer não disponível</p>
          )}
          <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl">×</button>
        </div>
      </Modal>

      
      <div className="p-10 bg-gradient-to-b from-black via-purple100 to-black">
        <Carousel title="Similares" items={similarMovies} type="movie" />
      </div>
    </div>
  );
};

export default MovieDetail;
