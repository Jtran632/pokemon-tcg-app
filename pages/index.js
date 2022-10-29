import { useState } from "react";
import pokemon from "pokemontcgsdk";
import PokemonModal from "../components/PokemonModal.js";
import Image from "next/image";
import { PokemonContext } from "../components/pokemonContext.js";
pokemon.configure({ apiKey: process.env.POKEMON_TCG_API_KEY });
export default function Home() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [inputText, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activePokemonObject, setActivePokemonObject] = useState(null);
  const [cardType, setCardType] = useState("Pokémon");
  const [filterType, setFilterType] = useState("set.releaseDate");
  const [asc, setAsc] = useState("");
  function getCard(props) {
    {
      setPokemonNames([]);
      try {
        pokemon.card
          .where({
            q: `name:${inputText} supertype:${cardType}`,
            orderBy: `${asc}${filterType}`,
          })
          .then((result) => {
            console.log("result", result);
            result.data.map((item) =>
              setPokemonNames((prev) => [
                ...prev,
                {
                  id: item.id,
                  supertype: item.supertype,
                  name: item.name,
                  series: item.set.series,
                  set: item.set.name,
                  setNumber: item.number.replace(/[^\d.-]/g, ""),
                  setTotal: item.set.total,
                  setImage: item.set.images.logo,
                  cardFlavorText: item.flavorText,
                  cardText: item.text,
                  superType: item.supertype,
                  subTypes: item.subtypes,
                  evolution: item.evolvesTo,
                  hp: item.hp,
                  types: item.types,
                  attacks: item.attacks,
                  abilities: item.abilities,
                  weak: item.weaknesses,
                  resistance: item.resistances,
                  retreat: item.retreatCost,
                  retreatColor: item.retreatCost,
                  retreatCost: item.convertedRetreatCost,
                  rules: item.rules,
                  rarity: item.rarity,
                  releaseDate: item.set.releaseDate,
                  artist: item.artist,
                  tcgplayer: item.tcgplayer,
                  cardmarket: item.cardmarket,
                  imageSmallURL: item.images.small,
                  imageLargeURL: item.images.large,
                },
              ])
            );
          });
      } catch (err) {
        alert(err);
      }
      // reference for my release date sorting will do desc later
      console.log("pokemonNames unsorted", pokemonNames);
    }
  }

  const PokemonCard = () => {
    return (
      <div>
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
          {pokemonNames.length > 0 ? (
            pokemonNames
              .map((item) => (
                <li key={item.id} className="zoom ">
                  <Image
                    src={item.imageSmallURL}
                    width={250}
                    height={350}
                    alt={item.id + " " + item.set}
                    loading="lazy"
                    blurDataURL={item.imageSmallURL}
                    placeholder="blur"
                    onClick={() => {
                      setActivePokemonObject(item);
                      setShowModal(true);
                    }}
                  />
                </li>
              ))
          ) : (
            <> </>
          )}
        </ul>
        {showModal ? <PokemonModal object={activePokemonObject} /> : null}
      </div>
    );
  };

  const pokemonSearch = () => {
    getCard(inputText);
    // console.log(pokemonNames);
  };

  return (
    <PokemonContext.Provider value={{ setShowModal, setActivePokemonObject }}>
      <div>
        <>
          <header>
            <div className="flex items-center justify-center">
              <h1
                className="text-4xl font-extrabold text-white "
                title="PokemonTCG App"
              >
                Pokemon TCG Viewer
              </h1>
            </div>

            <div className="flex items-center justify-center">
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
            <div>Asc</div>
          </header>
        </>

        <>
          <br />
          <div className="flex place-content-evenly">
            <PokemonCard />
          </div>
          <br />
          <br />
          <br />
        </>
      </div>
    </PokemonContext.Provider>
  );
}
