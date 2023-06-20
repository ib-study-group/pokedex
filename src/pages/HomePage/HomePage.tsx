import { PokemonList } from '../../components/PokemonList/PokemonList';
import { usePokemon } from '../../view/hooks/usePokemon';

import style from './Homepage.module.css';

const HomePage = () => {
  const { pokemon } = usePokemon();

  return (
    <main className={style.container}>
      {pokemon && <PokemonList pokemonsList={pokemon} />}
    </main>
  );
};

export { HomePage };
