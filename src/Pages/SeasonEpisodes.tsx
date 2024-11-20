import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import tmdb from '../api/tmdb';
import { Season, Episode, Video } from '../types';

Modal.setAppElement('#root');

const SeasonEpisodes = () => {
  const { id, seasonNumber } = useParams<{ id: string; seasonNumber: string }>();
  const [season, setSeason] = useState<Season | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      try {
        const response = await tmdb.get(`/tv/${id}/season/${seasonNumber}`);
        setSeason(response.data);
        setEpisodes(response.data.episodes);
      } catch (error) {
        console.error('Erro ao buscar detalhes da temporada:', error);
      }
    };

    fetchSeasonDetails();
  }, [id, seasonNumber]);

  const handlePlay = async () => {
    try {
      const response = await tmdb.get(`/tv/${id}/season/${seasonNumber}/videos`);
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

  if (!season) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="text-white min-h-screen">
        <div className="relative h-[800px] w-auto bg-center bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${season.poster_path})`,}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                <div className="absolute bottom-16 left-10 p-1 text-white sm:w-auto md:w-[741px] z-10 lg:ml-16">
                    <h1 className="text-5xl font-bold mb-4">{season.name}</h1>
                    <p className="text-lg mb-4">
                        {season.air_date?.slice(0, 4)} • {season.episode_count} episódios
                    </p>
                    <p className="text-lg mb-6">{season.overview}</p>

                    <button
                        onClick={handlePlay}
                        className="flex items-center text-black font-semibold py-2 px-4 rounded-lg">
                        <img src="/src/assets/images/play.svg" alt="Play" className="w-16 h-16 mr-2" />
                    </button>                
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

      <div className="p-5 md:p-20 bg-gradient-to-b from-black via-purple100 to-black">
        <h2 className="text-2xl font-semibold mb-4">Episódios</h2>
        <div className="flex flex-col items-center gap-4">
          {episodes.map((episode) => (
              <div key={episode.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-800 rounded-lg md:max-w-[1000px] md:w-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                  alt={episode.name}
                  className="h-full rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{episode.episode_number}. {episode.name}</h3>
                  <p className="text-sm text-gray-400">{episode.runtime} min</p>
                  <p className="text-sm text-gray-200 mt-2">{episode.overview}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonEpisodes;
