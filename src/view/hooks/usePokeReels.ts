import { useEffect, useState } from "react";

import { Pokemon } from "../../domain/Pokemon";
import { fetchManyPokemon } from "../../infrastructure/pokemon/fetchManyPokemon";

const OFFSET_REQUEST = 9;

export const usePokeReels = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReels = () => {
    setIsLoading(true);

    fetchManyPokemon({ start: pokemon.length + 1, offset: OFFSET_REQUEST })
      .then((result) => {
        console.log("Acolá");

        setPokemon((oldValue) => {
          if (!oldValue.length) return result;

          const newPokemons = result.filter(
            (r) => !oldValue.find((e) => e.id === r.id)
          );

          return [...oldValue, ...newPokemons];
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return {
    pokemon,
    fetchReels,
    isLoading,
  };
};
