import axios from 'axios';

const apiKey = '100157c6ac6ed863cb3bbb8efb9f0519';
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDAxNTdjNmFjNmVkODYzY2IzYmJiOGVmYjlmMDUxOSIsIm5iZiI6MTczMDgyMTg2OC44NDc2OTU0LCJzdWIiOiI2Njc5YTE3ZDVjYWZhY2JjMDczYjQ3NGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fiUjppQjk8QpVaCQ-7tjnzAE53VpRzVAh2BvnqINZn4';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    api_key: apiKey,
    language: 'pt-BR',
  },
});

const genreMap: { [key: string]: number } = {
  acao: 28,
  animacao: 16,
  comedia: 35,
  documentario: 99,
  drama: 18,
  "ficcao-cientifica": 878,
  horror: 27,
  romance: 10749,
};

export const getPopularMovies = async () => {
  try {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    return [];
  }
};

export const getPopularSeries = async () => {
  try {
    const response = await tmdb.get('/tv/popular');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries populares:', error);
    return [];
  }
};

export const getMarvelMovies = async () => {
  try {
    const response = await tmdb.get('/discover/movie', {
      params: { with_keywords: '180547' },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes do Universo Marvel:', error);
    return [];
  }
};

export const getTrending = async () => {
  try {
    const response = await tmdb.get('/trending/all/day');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes em tendência:', error);
    return [];
  }
};

export const getTrendingSeries = async () => {
  try {
    const response = await tmdb.get('/trending/tv/day');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries em tendência:', error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await tmdb.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes mais bem avaliados:', error);
    return [];
  }
};

export const getTopRatedSeries = async () => {
  try {
    const response = await tmdb.get('/tv/top_rated');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries mais bem avaliadas:', error);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await tmdb.get('/movie/upcoming');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes em breve:', error);
    return [];
  }
};

export const getUpcomingSeries = async () => {
  try {
    const response = await tmdb.get('/tv/on_the_air');
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar séries em breve:', error);
    return [];
  }
};

export const getMoviesByGenre = async (genreName: string) => {
  try {
    const genreId = genreMap[genreName.toLowerCase()];
    if (!genreId) throw new Error(`Gênero ${genreName} não encontrado.`);
    
    const response = await tmdb.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar filmes do gênero ${genreName}:`, error);
    return [];
  }
};

export const getSeriesByGenre = async (genreName: string) => {
  try {
    const genreId = genreMap[genreName.toLowerCase()];
    if (!genreId) throw new Error(`Gênero ${genreName} não encontrado.`);
    
    const response = await tmdb.get('/discover/tv', {
      params: { with_genres: genreId },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erro ao buscar séries do gênero ${genreName}:`, error);
    return [];
  }
};

export const getWatchProviders = async (id: number, type: 'movie' | 'tv') => {
  try {
    const response = await tmdb.get(`/${type}/${id}/watch/providers`);
    return response.data.results; 
  } catch (error) {
    console.error('Erro ao buscar provedores de exibição:', error);
    return null;
  }
};

export default tmdb;
