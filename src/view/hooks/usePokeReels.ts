import { useEffect, useState } from "react";

import { Pokemon } from "../../domain/Pokemon";
import { fetchManyPokemon } from "../../infrastructure/fetchManyPokemon";

const OFFSET_REQUEST = 9;

export const usePokeReels = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [startPokemon, setStartPokemon] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nextReels = () => {
    setStartPokemon((oldValue) => oldValue + OFFSET_REQUEST);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchManyPokemon({ start: startPokemon, offset: OFFSET_REQUEST })
      .then((result) => {
        setPokemon((oldValue) => {
          if (!oldValue.length) return result;

          const newPokemons = result.filter(
            (r) => !oldValue.find((e) => e.id === r.id)
          );

          return [...oldValue, ...newPokemons];
        });
      })
      .finally(() => setIsLoading(false));
  }, [startPokemon]);

  return {
    pokemon,
    nextReels,
    isLoading,
  };
};
