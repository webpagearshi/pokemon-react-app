// Import React hooks for managing state and side effects
import { useState } from "react";
import { useEffect } from "react";
// Import Card component which renders each Pokémon card
import Card from "./Card";
// Import CSS styling for the app
import "./App.css";

/* -------------------------------------------------------
   DATA: Pokémon dataset used in the app
   Each object represents one Pokémon with basic stats
------------------------------------------------------- */
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

/* -------------------------------------------------------
   Emoji icons used for dynamic favicon updates
   Each Pokémon type maps to an emoji
------------------------------------------------------- */
const typeEmojis = {
  Fire: "🔥",
  Water: "💧",
  Grass: "🌿",
  Electric: "⚡",
  Psychic: "🔮",
  Ghost: "👻",
  Dragon: "🐉",
  Fighting: "🥊",
  Rock: "🪨",
  Normal: "⭐",
  Favorites: "❤️",
};

function App() {
  /* -------------------------------------------------------
     STATE VARIABLES
  ------------------------------------------------------- */

  // Stores selected type filters
  // Example values: [], ["Fire"], ["Fire","Water"], ["Favorites"]
  const [typeFilter, setTypeFilter] = useState([]);

  // Stores IDs of Pokémon marked as favorite
  const [favorites, setFavorites] = useState([]);

  /* -------------------------------------------------------
     FUNCTION: Update browser favicon dynamically
  ------------------------------------------------------- */
  const updateFavicon = (emoji = null) => {
    // Select the favicon element from the HTML head
    const favicon = document.querySelector("link[rel='icon']");

    let svg;

    // If emoji provided → use emoji favicon
    if (emoji) {
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <text y=".9em" font-size="90">${emoji}</text>
      </svg>
    `;
    } else {
      // Otherwise show Pokéball favicon
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="white" stroke="black" stroke-width="4"/>
        <path d="M2 50 A48 48 0 0 1 98 50" fill="red" stroke="black" stroke-width="4"/>
        <line x1="2" y1="50" x2="98" y2="50" stroke="black" stroke-width="6"/>
        <circle cx="50" cy="50" r="12" fill="white" stroke="black" stroke-width="4"/>
      </svg>
    `;
    }
    // Convert SVG string to URL format
    const url = "data:image/svg+xml," + encodeURIComponent(svg);
    // Replace favicon
    favicon.href = url;
  };

  /* -------------------------------------------------------
     FUNCTION: Toggle Favorite Pokémon
  ------------------------------------------------------- */

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      // If Pokémon already favorite → remove it
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : // Otherwise add it to favorites
          [...prev, id],
    );
  };

  /* -------------------------------------------------------
     FUNCTION: Handle Filter Button Click
  ------------------------------------------------------- */

  // Toggle type filter (add/remove type from filter)
  const toggleType = (type) => {
    setTypeFilter((prev) => {
      // If Favorites is clicked
      if (type === "Favorites") {
        if (prev.includes("Favorites")) {
          return []; // deselect favorites
        }
        return ["Favorites"]; // select favorites exclusively
      }

      // If switching from Favorites to a type
      if (prev.includes("Favorites")) {
        return [type];
      }

      // Normal toggle for types
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }

      return [...prev, type];
    });
  };

  /* -------------------------------------------------------
     EXTRACT UNIQUE TYPES FROM DATA
  ------------------------------------------------------- */
  // Extract unique pokemon types
  const types = [...new Set(pokemons.map((p) => p.type))];

  /* -------------------------------------------------------
     FILTER LOGIC
     Determines which Pokémon are displayed
  ------------------------------------------------------- */
  const filteredPokemon = pokemons.filter((p) => {
    // If Favorites filter active → show only favorites
    if (typeFilter.includes("Favorites")) {
      return favorites.includes(p.id);
    }

    // If no filters selected → show all Pokémon
    if (typeFilter.length === 0) {
      return true;
    }
    // Otherwise show Pokémon matching selected types
    return typeFilter.includes(p.type);
  });

  /* -------------------------------------------------------
     SIDE EFFECT: Update favicon when filters change
  ------------------------------------------------------- */
  useEffect(() => {
    // If only one filter selected
    if (typeFilter.length === 1) {
      // Find emoji for that filter
      const emoji = typeEmojis[typeFilter[0]];
      // Update favicon
      updateFavicon(emoji);
    } else {
      // If multiple filters or none → show Pokéball
      updateFavicon(); // Pokeball
    }
  }, [typeFilter]);

  /* -------------------------------------------------------
     RENDER UI
  ------------------------------------------------------- */
  return (
    <>
      {/* App title */}
      <h1 className="app-header">Pokemon App</h1>
      {/* Filter buttons */}
      <div className="filters">
        {/* Show all Pokémon */}
        <button
          className={typeFilter.length === 0 ? "active-filter" : ""}
          onClick={() => setTypeFilter([])}
        >
          All
        </button>

        {/* Render type buttons dynamically */}
        {types.map((type) => (
          <button
            key={type}
            className={typeFilter.includes(type) ? "active-filter" : ""}
            onClick={() => toggleType(type)}
          >
            {type}
          </button>
        ))}

        {/* Favorites button */}
        <button
          className={typeFilter.includes("Favorites") ? "active-filter" : ""}
          onClick={() => setTypeFilter(["Favorites"])}
        >
          Favorites
        </button>
      </div>

      {/* Display active filters as removable chips */}
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

      {/* Pokémon card grid */}
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

// Export component so it can be used in main.jsx
export default App;
