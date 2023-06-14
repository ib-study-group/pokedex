import { Pokemon } from '../../domain/Pokemon';
import pokemonApiClient from '../api/apiClient';

type Sprite = {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
  };
};

type PokemonAPI = {
  id: number;
  name: string;
  sprites: Sprite;
  types: Type[];
};

const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
  const response = await pokemonApiClient.get<PokemonAPI>(
    `pokemon/${pokemonId}`
  );

  return formatPokemon(response.data);
};

const formatPokemon = (pokemonData: PokemonAPI): Pokemon => {
  const pokemonType = pokemonData.types.find((type) => type.slot === 1);
  const pokemonTypeName = pokemonType?.type.name || '';

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    sprite: pokemonData.sprites.other['official-artwork'].front_default,
    type: pokemonTypeName,
  };
};

export { getPokemon };
