import { Pokemon } from '../../domain/Pokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';

import styles from './PokemonList.module.css';

type PokemonListProps = {
  pokemonsList: Pokemon[];
};

const PokemonList = ({ pokemonsList }: PokemonListProps) => {
  return (
    <ul className={styles.container}>
      {pokemonsList.map(({ id, name, sprite, type }) => (
        <PokemonCard id={id} name={name} sprite={sprite} type={type} key={id} />
      ))}
    </ul>
  );
};

export { PokemonList };
