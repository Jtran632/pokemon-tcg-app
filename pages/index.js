import { useState } from "react";
import pokemon from "pokemontcgsdk";
import PokemonModal from "../components/PokemonModal.js";
import Image from "next/image";
import { PokemonContext } from "../components/pokemonContext.js";
import DropDown from "../components/DropDown.js";
pokemon.configure({ apiKey: process.env.POKEMON_TCG_API_KEY });
export default function Home() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [option, setOption] = useState(false);
  const [activePokemonObject, setActivePokemonObject] = useState(null);
  const [cardType, setCardType] = useState("Pokémon");
  const [filterType, setFilterType] = useState("set.releaseDate");
  const [order, setOrder] = useState("");
  function getCard() {
    {
      setPokemonNames([]);
      pokemon.card
        .where({
          q: `name:${inputText} supertype:${cardType}`,
          orderBy: `${order}${filterType}`,
        })
        .then((result) => {
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
    }
  }

  const PokemonCard = () => {
    return (
      <div>
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
          {pokemonNames.length > 0 ? (
            pokemonNames.map((item) => (
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
    getCard();
  };

  return (
    <PokemonContext.Provider
      value={{
        setShowModal,
        setActivePokemonObject,
        setCardType,
        setOrder,
        setFilterType,
      }}
    >
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

            <div className="flex items-center justify-center py-1 gap-1">
              <input
                className="border border-solid rounded border-black-1000"
                placeholder="Search Pokemon"
                type="text"
                onChange={(e) => setInputText(e.target.value)}
              />
              {inputText.length > 0 ? (
                <button
                  className="px-1 py-.05 font-semibold bg-white border border-blue-300 rounded text-green-400  hover:border-t-green-600"
                  onClick={pokemonSearch}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="px-1 py-.05 font-semibold bg-white border border-blue-300 rounded text-red-400 hover:border-t-red-600"
                  disabled={true}
                >
                  Submit
                </button>
              )}
            </div>

            <div className="flex items-center justify-center text-white gap-1 py-1 ">
              <DropDown
                items={{
                  Pokémon: "Pokémon",
                  Trainer: "Trainer",
                  Energy: "Energy",
                }}
                num={1}
              />
              <DropDown
                items={{
                  "Release Date": "set.releaseDate",
                  Rarity: "rarity",
                  Number: "number",
                }}
                num={2}
              />
              <DropDown items={{ Ascending: "", Descending: "-" }} num={3} />
            </div>
          </header>
        </>

        <>
          <div className="flex place-content-evenly py-5">
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
