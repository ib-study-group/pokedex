import { useCallback, useEffect, useRef } from 'react';

import { ReelsCard } from '../../components/ReelsCard/ReelsCard';
import { usePokeReels } from '../../view/hooks/usePokeReels';

import styles from './PokeReels.module.css';

export default function PokeReels() {
  const { pokemon, nextReels, isLoading } = usePokeReels();

  const cardRef = useRef<HTMLDivElement>(null);
  const shouldRequestAPI = useRef(true);

  const scrollHandler = useCallback(() => {
    const clientRects = cardRef.current?.getClientRects();
    if (!clientRects?.length) return;

    const LAST_CARD_POSITION = clientRects[0].bottom;
    const PENULTIMATE_CARD_POSITION = clientRects[0].height * 2;

    if (
      LAST_CARD_POSITION <= PENULTIMATE_CARD_POSITION &&
      shouldRequestAPI.current &&
      !isLoading
    ) {
      shouldRequestAPI.current = false;
      nextReels();
      shouldRequestAPI.current = true;
    }
  }, [nextReels, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true);
    return () => {
      window.removeEventListener('scroll', scrollHandler, true);
    };
  }, [scrollHandler]);

  return (
    <div className={styles.container}>
      {pokemon.map((pokemonData, index, array) => {
        return array.length === index + 2 ? (
          <ReelsCard key={pokemonData.id} pokemon={pokemonData} ref={cardRef} />
        ) : (
          <ReelsCard key={pokemonData.id} pokemon={pokemonData} />
        );
      })}
    </div>
  );
}
