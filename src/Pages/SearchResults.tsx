import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tmdb from '../api/tmdb';
import { MediaItem } from '../types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const ITEMS_PER_PAGE = 20;

const SearchResults = () => {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<MediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await tmdb.get('/search/multi', {
          params: { query, page: currentPage },
        });
        setResults(response.data.results);
        setTotalResults(response.data.total_results);
      } catch (error) {
        console.error('Erro ao buscar resultados:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, currentPage]);

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-10 text-white min-h-screen bg-gradient-to-b from-black via-purple100 to-black">
      <h1 className="text-2xl text-gray-500 font-bold mb-10 mt-20">
        Resultados para sua busca: <span className="text-white">"{query}"</span>
      </h1>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => navigate(`/${item.title ? 'movie' : 'serie'}/${item.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-displaySmallBold">Sem resultados.</p>
      )}

    
      {totalResults > ITEMS_PER_PAGE && (
        <div className="flex justify-between mt-8 items-center text-gray-400">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50"
            aria-label="Página Anterior"
          >
            <FaArrowLeft size={20} />
          </button>

          <span className="text-sm">{`Página ${currentPage} de ${totalPages}`}</span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 disabled:opacity-50"
            aria-label="Próxima Página"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
