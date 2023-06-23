import { useCallback, useEffect, useRef, useState } from "react";

import { usePokeReels } from "../../view/hooks/usePokeReels";

import { Layout } from "../../components/Layout/Layout";
import { ReelsCard } from "../../components/ReelsCard/ReelsCard";

import styles from "./PokeReels.module.css";

export default function PokeReels() {
  const { pokemon } = usePokeReels();

  const reelsContainerRef = useRef<HTMLDivElement>(null);

  const [cardSize, setCardSize] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [touchStartValue, setTouchStartValue] = useState<number>(0);
  const [touchMoveY, setTouchMoveY] = useState<number>(0);

  const TIMEOUT = 500;

  const onScrollEvent = useCallback(
    (e: WheelEvent) => {
      if (isRunning) return;

      setIsRunning(true);

      if (e.deltaY > 0) {
        setCurrentCard((old) => {
          return old === pokemon.length - 1 ? old : old + 1;
        });
      }

      if (e.deltaY < 0) {
        setCurrentCard((old) => {
          return old === 0 ? old : old - 1;
        });
      }

      setTimeout(() => {
        setIsRunning(false);
      }, TIMEOUT + 200);
    },
    [isRunning, pokemon.length]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const start_moveTouchEventDeltaY = e.touches[0].clientY - touchStartValue;

      setTouchMoveY(start_moveTouchEventDeltaY);
    },
    [touchStartValue]
  );

  const onTouchEventStart = useCallback((e: TouchEvent) => {
    if (e.touches.length) {
      setTouchStartValue(e.touches[0].clientY);
    }
  }, []);

  const onTouchEventEnd = useCallback(
    (e: TouchEvent) => {
      const touchEndValue = e.changedTouches[0].clientY;
      const start_endEventDeltaY = touchEndValue - touchStartValue;

      const MIN_CARD_HEIGHT = 30 / 100;
      const nextCardThreshold = cardSize * MIN_CARD_HEIGHT;
      const prevCardThreshold = cardSize * MIN_CARD_HEIGHT * -1;

      if (!e.changedTouches.length) return;

      // start_endEventDeltaY - should be positive to go back
      if (start_endEventDeltaY > nextCardThreshold) {
        // console.log("voltar");
        setTouchMoveY(0);
        // setTimeout(() => {
        setCurrentCard((old) => {
          return old === 0 ? old : old - 1;
        });
        // }, 1000);
      }

      // start_endEventDeltaY - should be negative to next
      if (start_endEventDeltaY < prevCardThreshold) {
        // console.log("avançar");
        setTouchMoveY(0);

        setCurrentCard((old) => {
          return old === pokemon.length - 1 ? old : old + 1;
        });
      }

      setTimeout(() => {
        setTouchMoveY(0);
      }, 100);
    },
    [touchStartValue, cardSize, pokemon.length]
  );

  useEffect(() => {
    const cardHeight = reelsContainerRef.current?.getClientRects()[0].height;

    if (cardHeight) {
      setCardSize(cardHeight);
    }
  }, []);

  useEffect(() => {
    const ref = reelsContainerRef.current;

    ref?.addEventListener("wheel", onScrollEvent);
    ref?.addEventListener("touchmove", onTouchMove);
    ref?.addEventListener("touchend", onTouchEventEnd);
    ref?.addEventListener("touchstart", onTouchEventStart);

    return () => {
      ref?.removeEventListener("wheel", onScrollEvent);
      ref?.removeEventListener("touchmove", onTouchMove);
      ref?.removeEventListener("touchend", onTouchEventEnd);
      ref?.removeEventListener("touchstart", onTouchEventStart);
    };
  }, [onTouchEventStart, onTouchMove, onTouchEventEnd, onScrollEvent]);

  return (
    <Layout className={styles.container}>
      <div className={styles.reelsContainer} ref={reelsContainerRef}>
        {pokemon.map((pokemonData, index) => (
          <ReelsCard
            key={pokemonData.id}
            pokemon={pokemonData}
            style={{
              zIndex: 100 - index,
              transition: `top ${TIMEOUT}ms ease-in`,
              top: (index - currentCard) * cardSize + touchMoveY,
            }}
          />
        ))}
      </div>
    </Layout>
  );
}
