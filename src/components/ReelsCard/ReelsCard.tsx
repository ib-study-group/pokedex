import { HTMLAttributes, forwardRef } from "react";

import { Pokemon } from "../../domain/Pokemon";

import styles from "./ReelsCard.module.css";
import { numberPad } from "../../utils/numberPad";

type ReelsCardProps = HTMLAttributes<HTMLDivElement> & {
  pokemon: Pokemon;
};

export const ReelsCard = forwardRef<HTMLDivElement, ReelsCardProps>(
  ({ pokemon, ...props }, ref) => {
    return (
      <div
        {...props}
        className={styles.card}
        ref={ref}
        data-pokemon-type={pokemon.type}
      >
        <header className={styles.header}>
          <p>{pokemon.name}</p>
          <span>#{numberPad(pokemon.id, 3)}</span>
        </header>
        <img
          className={styles.pokemonImage}
          src={pokemon.sprite}
          alt={pokemon.name}
        />
        <div className={styles.detailsContainer}>
          <div className={styles.badges}>
            <span data-pokemon-type={pokemon.type}>{pokemon.type}</span>
          </div>
        </div>
      </div>
    );
  }
);
