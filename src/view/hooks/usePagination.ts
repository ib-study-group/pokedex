import { useEffect, useState } from "react";
import { Pokemon } from "../../domain/Pokemon";
import { fetchManyPokemon } from "../../infrastructure/pokemon/fetchManyPokemon";

const POKEMONS_PER_PAGE = 9;

type UsePagination = () => {
  pokemon: Pokemon[];
  nextPage: () => void;
  prevPage: () => void;
};

export const usePagination: UsePagination = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  useEffect(() => {
    fetchManyPokemon({
      start: currentPage === 1 ? 1 : POKEMONS_PER_PAGE * (currentPage - 1) + 1,
      offset: POKEMONS_PER_PAGE,
    }).then((data) => setPokemon(data));
  }, [currentPage]);

  return {
    pokemon,
    nextPage,
    prevPage,
  };
};
