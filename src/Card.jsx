const typeColors = {
  Fire: "#f08030",
  Water: "#6890f0",
  Grass: "#78c850",
  Electric: "#f8d030",
  Psychic: "#f85888",
  Normal: "#a8a878",
  Ghost: "#705898",
  Dragon: "#7038f8",
  Fighting: "#c03028",
  Rock: "#b8a038",
};

function Card({ pokemon }) {
  const color = typeColors[pokemon.type] || "#ccc";
  return (
    <div
      className="card"
      style={{
        "--type-color": color,
        border: `3px solid ${color}`,
        boxShadow: `0 6px 12px ${color}40`,
      }}
    >
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
