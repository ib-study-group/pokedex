import { useEffect, useState } from 'react';
import { getPokemon } from '../../infra/pokemon/getPokemon';
import { Pokemon } from '../../domain/Pokemon';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';

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
    pokemon && (
      <PokemonCard
        id={pokemon.id}
        name={pokemon.name}
        sprite={pokemon.sprite}
        type={pokemon.type}
      />
    )
  );
};

export { HomePage };
