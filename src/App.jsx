import { useState } from "react";
import Card from "./Card";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const pokemons = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

function App() {
  const [typeFilter, setTypeFilter] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite status of a pokemon
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  // Toggle type filter (add/remove type from filter)
  const toggleType = (type) => {
    setTypeFilter((prev) => {
      // If favorites is active, reset first
      if (prev.includes("Favorites")) {
        return [type];
      }

      // Normal toggle
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }

      return [...prev, type];
    });
  };

  // Extract unique pokemon types
  const types = [...new Set(pokemons.map((p) => p.type))];

  //Filter logic
  const filteredPokemon = pokemons.filter((p) => {
    if (typeFilter.includes("Favorites")) {
      return favorites.includes(p.id);
    }

    if (typeFilter.length === 0) {
      return true;
    }

    return typeFilter.includes(p.type);
  });

  return (
    <>
      <h1>Pokemon App</h1>
      <div className="filters">
        <button
          className={typeFilter.length === 0 ? "active-filter" : ""}
          onClick={() => setTypeFilter([])}
        >
          All
        </button>

        {types.map((type) => (
          <button
            key={type}
            className={typeFilter.includes(type) ? "active-filter" : ""}
            onClick={() => toggleType(type)}
          >
            {type}
          </button>
        ))}

        <button
          className={typeFilter.includes("Favorites") ? "active-filter" : ""}
          onClick={() => setTypeFilter(["Favorites"])}
        >
          Favorites
        </button>
      </div>
      <div className="active-filters">
        {typeFilter.map((filter) => (
          <span
            key={filter}
            className="filter-chip"
            onClick={() => toggleType(filter)}
          >
            {filter} ✕
          </span>
        ))}
      </div>
      <div className="card-container">
        {filteredPokemon.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.includes(pokemon.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </>
  );
}

export default App;
