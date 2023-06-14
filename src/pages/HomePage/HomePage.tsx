import { useEffect, useState } from 'react';

import { Pokemon } from '../../domain/Pokemon';
import { getPokemon } from '../../infra/pokemon/getPokemon';
import { PokemonList } from '../../components/PokemonList/PokemonList';

import style from './Homepage.module.css';

const HomePage = () => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const getList = async () => {
      const pokemon = await getPokemon(7);

      setPokemon(pokemon);
    };

    getList();
  }, []);

  return (
    <main className={style.container}>
      {pokemon && (
        <PokemonList pokemonsList={[pokemon, pokemon, pokemon, pokemon]} />
      )}
    </main>
  );
};

export { HomePage };
