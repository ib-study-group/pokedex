import { createContext, useEffect, useMemo, useState } from "react";

import { Pokemon } from "../../domain/Pokemon";
import { fetchManyPokemon } from "../../infrastructure/fetchManyPokemon";

type PokemonContextValue = {
  pokemon: Pokemon[];
};

type PokemonProviderProps = {
  children: React.ReactNode;
};

export const PokemonContext = createContext({} as PokemonContextValue);

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchManyPokemon(10).then((result) => setPokemon(result));
  }, []);

  const value = useMemo(
    () => ({
      pokemon,
    }),
    [pokemon]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
