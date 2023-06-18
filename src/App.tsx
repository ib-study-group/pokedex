import styles from "./App.module.css";
import { usePagination } from "./view/hooks/usePagination";

function App() {
  const { pokemon, nextPage, prevPage } = usePagination();

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
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default App;
