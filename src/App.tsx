import { useEffect, useState, useCallback } from "react";

type Pokemon = {
  id: number;
  name: string;
  sprite: string;
};

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const fetchPokemon = useCallback(async (id: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    // Wrong way to set state while fetching data
    // const newPokemon = pokemon.some((p) => p.name === data.name)
    //   ? pokemon
    //   : [
    //       ...pokemon,
    //       {
    //         name: data.name,
    //         sprite: data.sprites.front_default,
    //       },
    //     ];

    // console.log(newPokemon);

    // setPokemon(newPokemon);

    setPokemon((oldState) => {
      return oldState.some((p) => p.name === data.name)
        ? oldState
        : [
            ...oldState,
            {
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
            },
          ];
    });
  }, []);

  useEffect(() => {
    // Forma 1 - Chaining by using consecutive awaits statements
    // (async () => {
    //   await fetchPokemon("1");
    //   await fetchPokemon("2");
    //   await fetchPokemon("3");
    //   await fetchPokemon("4");
    //   await fetchPokemon("5");
    // })();
    //
    // Forma 2 - Promise All
    Promise.all([
      fetchPokemon("1"),
      fetchPokemon("2"),
      fetchPokemon("3"),
      fetchPokemon("4"),
      fetchPokemon("5"),
    ]);
    //
    // Forma 3 - Composition
    // [
    //   () => fetchPokemon("1"),
    //   () => fetchPokemon("2"),
    //   () => fetchPokemon("3"),
    //   () => fetchPokemon("4"),
    //   () => fetchPokemon("5"),
    // ].reduce((p, f) => p.then(f), Promise.resolve());
  }, [fetchPokemon]);

  return (
    <div style={styles.container}>
      {pokemon.map((pokemon) => {
        return (
          <div key={pokemon.id} style={styles.card}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  card: {
    display: "block",
  },
};

export default App;
