import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef } from "react";

import { usePokeReels } from "../../view/hooks/usePokeReels";

import { Layout } from "../../components/Layout/Layout";
import { ReelsCard } from "../../components/ReelsCard/ReelsCard";

import styles from "./PokeReels.module.css";

export default function PokeReels() {
  const { pokemon, fetchReels, isLoading } = usePokeReels();

  const cardRef = useRef<HTMLDivElement>(null);
  const debouncedFetchReels = debounce(fetchReels, 100);

  const scrollHandler = useCallback(() => {
    const clientRects = cardRef.current?.getClientRects();
    if (!clientRects?.length) return;

    const CARD_QUANTITY = 2;
    const lastCardPosition = clientRects[0].bottom;
    const penultimateCardPosition = clientRects[0].height * CARD_QUANTITY;

    console.log("Alí");

    if (lastCardPosition <= penultimateCardPosition && !isLoading) {
      debouncedFetchReels();
    }
  }, [isLoading, debouncedFetchReels]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, [scrollHandler]);

  return (
    <Layout className={styles.container}>
      {pokemon.map((pokemonData, index, array) => {
        const isPenultimateCard = array.length - 1 === index;
        return (
          <ReelsCard
            key={pokemonData.id}
            pokemon={pokemonData}
            ref={isPenultimateCard ? cardRef : null}
          />
        );
      })}
    </Layout>
  );
}
