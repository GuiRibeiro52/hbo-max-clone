import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BannerProps {
  title: string;
  description: string;
  backdrop_path: string;
  id: number;
  type: 'movie' | 'serie';
}

const Banner: React.FC<BannerProps> = ({ title, description, backdrop_path, id, type }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    alert("Abrir trailer do filme ou série"); 
  };

  const handleMoreInfo = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div
      className="relative h-[800px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      
      <div className="absolute bottom-16 left-10 text-white max-w-lg z-10 ml-32">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{description}</p>

        <div className="flex gap-4 items-center">
          <button
            onClick={handlePlay}
            className="flex items-center text-black font-semibold py-2 px-4 rounded-lg ">
            <img src="/src/assets/images/play.svg" alt="Play" className="w-16 h-16" />            
          </button>

          <button
            onClick={handleMoreInfo}
            className="bg-white bg-opacity-30 text-white font-semibold px-8 rounded-full hover:bg-opacity-50 transition h-12">
            MAIS INFORMAÇÕES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
