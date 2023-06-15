import { Pokemon } from "../domain/Pokemon";
import { fetchPokemon } from "./fetchPokemon";

export const fetchManyPokemon = async (amount: number): Promise<Pokemon[]> => {
  const queryPokemonFn = [...Array(amount).keys()].map((_, idx) =>
    fetchPokemon(1 + idx)
  );

  const data = await Promise.all(queryPokemonFn).then((res) => res);

  return data;
};
