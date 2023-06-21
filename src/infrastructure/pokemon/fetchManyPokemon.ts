import { Pokemon } from "../../domain/Pokemon";
import { fetchPokemon } from "./fetchPokemon";

type FetchManyPokemonParams = {
  offset: number;
  start: number;
};

type FetchManyPokemon = (params: FetchManyPokemonParams) => Promise<Pokemon[]>;

export const fetchManyPokemon: FetchManyPokemon = async ({
  offset,
  start = 1,
}) => {
  const queryPokemonFn = [...Array(offset).keys()].map((_, idx) =>
    fetchPokemon(start + idx)
  );

  const data = await Promise.all(queryPokemonFn).then((res) => res);

  return data;
};
