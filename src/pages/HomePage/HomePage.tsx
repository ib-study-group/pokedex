import { usePokemon } from "../../view/hooks/usePokemon";
import { Navigation } from "../../components/Navigation/Navigation";
import { PokemonList } from "../../components/PokemonList/PokemonList";

import { TbPokeball } from "react-icons/tb";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

import style from "./Homepage.module.css";

const HomePage = () => {
  const { pokemon } = usePokemon();

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
    <main className={style.container}>
      {pokemon && <PokemonList pokemonsList={pokemon} />}
      <Navigation tabs={tabs} />
    </main>
  );
};

export { HomePage };
