import { useContext } from "react";
import { PokemonContext } from "../components/PokemonProvider";

export const usePokemon = () => {
  const { pokemon } = useContext(PokemonContext);

  if (!pokemon) {
    throw new Error("Use a Pokemon provider, pls");
  }

  return {
    pokemon,
  };
};
