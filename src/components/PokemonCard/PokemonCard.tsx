import { Pokemon } from '../../domain/Pokemon';
import { numberPad } from '../../utils/numberPad';
import styles from './PokemonCard.module.css';

const PokemonCard = ({ sprite, name, id, type }: Pokemon) => {
  return (
    <li className={styles.container} data-pokemon-type={type}>
      <span className={styles.number}>{`#${numberPad(id, 3)}`}</span>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={sprite} alt={name} />
      </div>
      <p className={styles.name}>{name}</p>
    </li>
  );
};

export { PokemonCard };
