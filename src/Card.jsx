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

function Card({ pokemon, isFavorite, toggleFavorite }) {
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
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <p className="type-badge">{pokemon.type}</p>
      <div className="pokemon-stats">
        <p>HP: {pokemon.hp}</p>
        <p>Attack: {pokemon.attack}</p>
      </div>
      <button
        className="favorite-btn"
        onClick={() => toggleFavorite(pokemon.id)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default Card;
