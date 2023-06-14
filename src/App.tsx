import { useEffect, useState } from "react";

import styles from "./App.module.css";

type Pokemon = {
  id: number;
  name: string;
  sprite: string;
};

type FetchPokemon = (id: number, pokemons: Pokemon[]) => Promise<Pokemon[]>;

type FetchManyPokemons = (amount: number) => Promise<Pokemon[]>;

const fetchManyPokemons: FetchManyPokemons = (amount: number) => {
  const result = [];

  for (const index of Array(amount).keys()) {
    result.push((result: Pokemon[]) => fetchPokemon(index + 1, result));
  }

  return result.reduce((p, f) => p.then(f), Promise.resolve([] as Pokemon[]));
};

const fetchPokemon: FetchPokemon = async (id, pokemons) => {
  if (pokemons.find((p) => p.id === id)) {
    return Promise.resolve(pokemons);
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
  };

  return [...pokemons, pokemon];
};

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchManyPokemons(10).then((result) => setPokemon(result));
  }, []);

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
