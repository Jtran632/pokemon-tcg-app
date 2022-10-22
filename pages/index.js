import { useState, useEffect } from "react";
import pokemon from "pokemontcgsdk";
pokemon.configure({ apiKey: process.env.POKEMON_TCG_API_KEY });
export default function Home() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [inputText, setInput] = useState("");
  function getCard(props) {
    {
      setPokemonNames([]);
      pokemon.card
        // .where({ q: `name:${props}`, pageSize: 30, page: 1 })
        .where({ q: `name:${props}` })
        .then((result) => {
          console.log(result.data);
          result.data.map((item) =>
            setPokemonNames((prev) => [
              ...prev,
              {
                id: item.id,
                name: item.name,
                series: item.set.series,
                set: item.set.name,
                setNumber: item.number.replace(/[^\d.-]/g, ""),
                setTotal: item.set.total,
                rarity: item.rarity,
                releaseDate: item.set.releaseDate,
                artist: item.artist,
                imageURL: item.images.large,
              },
            ])
          );
        });
    }
  }
  const pokemonSearch = () => {
    getCard(inputText);
    // console.log(pokemonNames);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header>
        <h1 className="text-4xl" title="PokemonTCG App">
          Pokemon Card Viewer
        </h1>
      </header>
      <div>
        <input
          className="border border-solid rounded border-black-1000"
          placeholder="Search Pokemon"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-1 py-.05 font-semibold bg-white border border-blue-300 rounded text-blue-1000 hover:text-white hover:border-t-green-600"
          onClick={pokemonSearch}
        >
          Submit
        </button>
      </div>
      <ul>
        <br />
        <div className="grid grid-cols-5 gap-10 place-content-evenly">
          {pokemonNames != null ? (
            pokemonNames.map((item) => (
              <card key={item.id}>
                <picture>
                  <img src={item.imageURL} width={250} alt="Picture of Card" />
                </picture>
              </card>
            ))
          ) : (
            <li> </li>
          )}
        </div>
      </ul>
    </div>
  );
}

{
  //use later for models 
  /* {item.name} */
}
{
  /* Series/Set: {item.series} - {item.set}
                <br />
                Rarity: {item.rarity}, Number: {item.setNumber}/{item.setTotal},
                Release Date: {item.releaseDate}
                <br />
                Artist: {item.artist}
                <br /> */
}
