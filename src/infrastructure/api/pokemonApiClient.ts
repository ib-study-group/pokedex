const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonApiClient = async <T>(
  endpoint: string,
  options?: Request
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, { ...options });
  const data = await response.json();

  return data;
};
