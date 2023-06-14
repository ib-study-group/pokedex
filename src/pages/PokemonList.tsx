const PokemonList = () => {
  return (
    <div key={'pokemon.id'}>
      <img src={'pokemon.sprite'} alt={'pokemon.name'} />
      <p>{'pokemon.name'}</p>
    </div>
  );
};

export { PokemonList };
