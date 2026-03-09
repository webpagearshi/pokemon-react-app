function Card({ pokemon }) {
  return (
    <div className="card">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.type}</p>
      <p>HP: {pokemon.hp}</p>
      <p>Attack: {pokemon.attack}</p>
    </div>
  );
}

export default Card;
