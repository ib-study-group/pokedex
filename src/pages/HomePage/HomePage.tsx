import { useEffect, useState } from 'react';

import { Pokemon } from '../../domain/Pokemon';
import { getPokemon } from '../../infra/pokemon/getPokemon';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';

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
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          sprite={pokemon.sprite}
          type={pokemon.type}
        />
      )}
    </main>
  );
};

export { HomePage };
