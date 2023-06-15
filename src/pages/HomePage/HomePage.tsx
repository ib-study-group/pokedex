import { useCallback, useEffect, useState } from 'react';

import { Pokemon } from '../../domain/Pokemon';
import { getPokemonsList } from '../../infra/pokemon/getPokemonsList';
import { PokemonList } from '../../components/PokemonList/PokemonList';

import style from './Homepage.module.css';

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>();

  const getList = useCallback(async () => {
    const pokemonsList = await getPokemonsList(6);

    setPokemons(pokemonsList);
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <main className={style.container}>
      {pokemons && <PokemonList pokemonsList={pokemons} />}
    </main>
  );
};

export { HomePage };
