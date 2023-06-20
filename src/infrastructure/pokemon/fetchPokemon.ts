import { Pokemon } from '../../domain/Pokemon';
import { pokemonApiClient } from '../api/pokemonApiClient';

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

type PokemonAPIReturn = {
  id: number;
  name: string;
  sprites: Sprite;
  types: Type[];
};

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
  const data = await pokemonApiClient<PokemonAPIReturn>(String(id));

  return apiReturnToPokemon(data);
};

const apiReturnToPokemon = (data: PokemonAPIReturn): Pokemon => {
  const pokemonType = data.types.find((type) => type.slot === 1);
  const pokemonTypeName = pokemonType?.type.name || '';

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    type: pokemonTypeName,
  };
};
