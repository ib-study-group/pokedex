import styles from "./App.module.css";
import { usePokemon } from "./view/hooks/usePokemon";

function App() {
  const { pokemon } = usePokemon();

  return (
    <div className={styles.container}>
      {pokemon.map((pokemon) => {
        return (
          <div key={pokemon.id} className={styles.card}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
