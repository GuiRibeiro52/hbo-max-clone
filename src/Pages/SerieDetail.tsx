import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import tmdb from '../api/tmdb';
import Carousel from '../components/Carousel';
import { Serie, Season, Video } from '../types';

Modal.setAppElement('#root');

const SerieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [serie, setSerie] = useState<Serie | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [similarSeries, setSimilarSeries] = useState<Serie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSerieDetails = async () => {
      try {
        const response = await tmdb.get(`/tv/${id}`);
        setSerie(response.data);
        setSeasons(response.data.seasons);
      } catch (error) {
        console.error('Erro ao buscar detalhes da série:', error);
      }
    };

    const fetchSimilarSeries = async () => {
      try {
        const response = await tmdb.get(`/tv/${id}/similar`);
        setSimilarSeries(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar séries similares:', error);
      }
    };

    fetchSerieDetails();
    fetchSimilarSeries();
  }, [id]);

  const handlePlay = async () => {
    try {
      const response = await tmdb.get(`/tv/${id}/videos`);
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

  if (!serie) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="text-white min-h-screen">      
      <div
        className="relative h-[600px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${serie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-black" />
        <div className="absolute bottom-16 left-10 text-white w-[741px] z-10 ml-32">
          <h1 className="text-5xl font-bold mb-4">{serie.name}</h1>
          <p className="text-lg font-semibold mb-4">Série</p>
          <p className="text-lg mb-4">
            {serie.first_air_date?.slice(0, 4)} • {serie.number_of_seasons} temporada(s)
          </p>
          <p className="text-lg mb-6">{serie.overview}</p>

          <div className="flex gap-4">
            <button
              onClick={handlePlay}
              className="flex items-center text-black font-semibold py-2 px-4  rounded-lg">
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
        <h2 className="text-3xl font-semibold mb-4">Temporadas</h2>
        <div className="flex gap-6">
          {seasons.map((season) => (
            <Link 
              key={season.id}
              to={`/serie/${id}/season/${season.season_number}`} 
              className="season-item"
            >
              <img 
                src={`https://image.tmdb.org/t/p/w300${season.poster_path}`} 
                alt={season.name} 
                className="rounded-lg w-[240px] h-[361px]" 
              />
              <p className="text-center mt-2">{season.name}</p>
            </Link>
          ))}
        </div>

        <Carousel title="Similares" items={similarSeries} type="serie" />
      </div>
    </div>
  );
};

export default SerieDetail;
