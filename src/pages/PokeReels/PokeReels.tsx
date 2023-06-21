import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef } from "react";

import { ReelsCard } from "../../components/ReelsCard/ReelsCard";
import { usePokeReels } from "../../view/hooks/usePokeReels";

import styles from "./PokeReels.module.css";
import { Navigation } from "../../components/Navigation/Navigation";
import { TbPokeball } from "react-icons/tb";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

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

  const tabs = [
    {
      link: "/",
      icon: <TbPokeball />,
    },
    {
      link: "/poke-reels",
      icon: <MdOutlineSlowMotionVideo />,
    },
  ];

  return (
    <div className={styles.container}>
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
      <Navigation tabs={tabs} />
    </div>
  );
}
