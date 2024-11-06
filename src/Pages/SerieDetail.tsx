import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../api/tmdb';
import { Serie } from '../types';

const SerieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [serie, setSerie] = useState<Serie | null>(null); 
  useEffect(() => {
    const fetchSerieDetails = async () => {
      try {
        const response = await tmdb.get(`/tv/${id}`);
        setSerie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da série:', error);
      }
    };

    fetchSerieDetails();
  }, [id]);

  if (!serie) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 text-white bg-gray-900">
      <h1 className="text-4xl font-bold">{serie.name}</h1>
      <p className="text-lg my-4">{serie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
    </div>
  );
};

export default SerieDetail;
