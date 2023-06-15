import { Pokemon } from "../domain/Pokemon";
import { pokemonApiClient } from "./pokemonApiClient";

type PokemonAPIReturn = {
  id: number;
  sprites: {
    front_default: string;
  };
  name: string;
};

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
  const data = await pokemonApiClient<PokemonAPIReturn>(String(id));

  return apiReturnToPokemon(data);
};

const apiReturnToPokemon = (data: PokemonAPIReturn): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
  };
};
