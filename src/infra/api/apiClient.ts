import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const pokemonApiClient = axios.create({
  baseURL: BASE_URL,
});

export default pokemonApiClient;

export type PokemonApiClient = typeof pokemonApiClient;
