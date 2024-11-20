import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import tmdb, { getWatchProviders } from '../api/tmdb';
import Carousel from '../components/Carousel';
import { Serie, Season, Video, WatchProvider, CastMember } from '../types';

Modal.setAppElement('#root');

const SerieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [serie, setSerie] = useState<Serie | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [similarSeries, setSimilarSeries] = useState<Serie[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [providers, setProviders] = useState<WatchProvider[]>([]);

  const formatDateToBR = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

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

    const fetchCredits = async () => {
      try {
        const response = await tmdb.get(`/tv/${id}/credits`);
        setCast(response.data.cast.slice(0, 5));
      } catch (error) {
        console.error('Erro ao buscar elenco e equipe:', error);
      }
    };

    const fetchWatchProviders = async () => {
      const providerData = await getWatchProviders(Number(id), 'tv');
      if (providerData && providerData['BR']) {
        const allProviders = [
          ...(providerData['BR'].flatrate || []),
          ...(providerData['BR'].buy || []),
          ...(providerData['BR'].rent || []),
        ];
        setProviders(allProviders);
      }
    };

    fetchSerieDetails();
    fetchSimilarSeries();
    fetchCredits();
    fetchWatchProviders();
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
        console.error('Trailer não encontrado.');
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
        className="relative h-[400px] md:h-[800px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${serie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <div className="absolute w-[280px] md:bottom-16 sm:w-[400px] md:w-[600px] lg:left-10 text-white lg:w-[741px] z-10 mt-32 m-8 sm:mt-52">
          <h1 className="text-lg sm:text-5xl font-bold mb-4 mt-10 sm:mt-0">{serie.name}</h1>
          <p className="text-xl font-semibold mb-4">Série</p>
          <p className="text-lg mb-4">Data de lançamento: {formatDateToBR(serie.first_air_date || '')}</p>
          <p className="text-sm mb-4">{serie.number_of_seasons} temporada(s)</p>
          <p className="text-lg mb-6">{serie.overview}</p>
          <div className="grid sm:flex gap-10 sm:items-center">
            <button
              onClick={handlePlay}
              className="flex items-center text-black font-semibold py-2 px-4 rounded-lg"
            >
              <img src="/src/assets/images/play.svg" alt="Play" className="w-16 h-16 mr-2" />
            </button>

            <div className="flex flex-col items-center gap-2">
              <h3>Onde Assistir?</h3>
              <div className="grid grid-cols-4 sm:flex gap-4">
                {providers.slice(0, 5).map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-12 h-12 rounded-full"
                    title={provider.provider_name}
                  />
                ))}
                {providers.length > 5 && (
                  <span className="text-sm text-gray-300">+{providers.length - 5} mais</span>
                )}
              </div>
            </div>
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
          <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl">
            ×
          </button>
        </div>
      </Modal>

      <div className="pt-[300px] md:pt-[100px] p-10 bg-gradient-to-b from-black via-purple100 to-black ">
        <div className="mb-10 flex flex-col items-center pt-32 md:pt-0">
          <h2 className="mt-[100px] sm:mt-0 text-3xl font-semibold mb-4">Detalhes do Elenco</h2>
          <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:flex justify-center gap-4">
            {cast.map((member) => (
              <div key={member.cast_id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className="w-[240px] h-[361px] rounded-lg"
                />
                <p>{member.name}</p>
                <p className="text-gray-400 text-sm">{member.character}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-semibold mb-4">Temporadas</h2>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-20">
          {seasons.map((season) => (
          <Link to={`/serie/${id}/season/${season.season_number}`} key={season.id}>
            <div className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                alt={season.name}
                className="rounded-lg w-[240px] h-[361px] cursor-pointer"
              />
              <p className="text-center mt-2">{season.name}</p>
            </div>
          </Link>
          ))}
        </div>

        <Carousel title="Similares" items={similarSeries} type="serie" />
      </div>
    </div>
  );
};

export default SerieDetail;
