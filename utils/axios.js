import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4df8cd00ae9aaaf59d1b8d086133e12c', // Substitua pelo seu token da API TMDB
    language: 'pt-BR'
  }
});

export default instance;
