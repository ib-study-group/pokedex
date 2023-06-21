import { usePokemon } from "../../view/hooks/usePokemon";

import { Layout } from "../../components/Layout/Layout";
import { PokemonList } from "../../components/PokemonList/PokemonList";

import styles from "./Homepage.module.css";

const HomePage = () => {
  const { pokemon } = usePokemon();

  return (
    <Layout className={styles.container}>
      {pokemon && <PokemonList pokemonsList={pokemon} />}
    </Layout>
  );
};

export { HomePage };
