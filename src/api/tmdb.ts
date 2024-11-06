// src/api/tmdb.ts

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
  },
});

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
      params: {
        with_keywords: 'marvel',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes do Universo Marvel:', error);
    return [];
  }
};

export default tmdb;
