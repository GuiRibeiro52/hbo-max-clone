import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import tmdb from '../api/tmdb';

Modal.setAppElement('#root');

interface BannerProps {
  title: string;
  description: string;
  backdrop_path: string;
  id: number;
  type: 'movie' | 'serie';
}

interface Video {
  type: string;
  site: string;
  key: string;
}

const Banner: React.FC<BannerProps> = ({ title, description, backdrop_path, id, type }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const handlePlay = () => {
    fetchTrailer();
    setIsModalOpen(true);
  };

  const handleMoreInfo = () => {
    navigate(`/${type}/${id}`);
  };

  const fetchTrailer = async () => {
    try {
      const response = await tmdb.get(`/${type === 'movie' ? 'movie' : 'tv'}/${id}/videos`);
      const trailer = response.data.results.find(
        (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    } catch (error) {
      console.error('Erro ao buscar trailer:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerUrl(null);
  };

  return (
    <div
      className="relative h-[800px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      
      <div className="absolute bottom-16 left-10 text-white w-[741px] z-10 ml-32">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{description}</p>

        <div className="flex gap-4 items-center">
          <button
            onClick={handlePlay}
            className="flex items-center text-black font-semibold py-2 px-4 rounded-lg"
          >
            <img src="/src/assets/images/play.svg" alt="Play" className="w-16 h-16" />            
          </button>

          <button
            onClick={handleMoreInfo}
            className="bg-white bg-opacity-30 text-white font-semibold px-8 rounded-full hover:bg-opacity-50 transition h-12"
          >
            MAIS INFORMAÇÕES
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
    </div>
  );
};

export default Banner;
