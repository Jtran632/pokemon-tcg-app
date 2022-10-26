import { useContext } from "react";
import Image from "next/image";
import { PokemonContext } from "./pokemonContext";
function PokemonModal({ object: item }) {
  const { setShowModal } = useContext(PokemonContext);
  return (
    <div className="PokemonModal border-8 border-teal-100 rounded border-double bg-black text-black p-2">
      <div>
        <button
          className="bg-transparent hover:bg-blue-400 text-white font-bold text-4xl py-1 px-2 border-b-3 border-blue-700 hover:border-blue-500 rounded modalbtn"
          onClick={() => setShowModal(false)}
        >
          {" "}
          X{" "}
        </button>
        <div className="grid grid-cols-3 gap-3">
          <ul>
            <Image
              src={item.setImage}
              width={200}
              height={100}
              alt={item.set}
              loading="lazy"
              blurDataURL={item.setImage}
              placeholder="blur"
              onClick={() => {
                setActivePokemonObject(item);
                setShowModal(true);
              }}
            />
            <Image
              src={item.imageLargeURL}
              width={500}
              height={700}
              alt={item.id + " " + item.set}
              loading="lazy"
              blurDataURL={item.imageSmallURL}
              placeholder="blur"
              onClick={() => {
                setActivePokemonObject(item);
                setShowModal(true);
              }}
            />
          </ul>
          {item.superType === "Pokémon" ? (
            <ul className="text-black font-medium">
              <h1 className="text-4xl">{item.name}</h1>
              <h1>
                {item.superType} - {item.subTypes.map((i) => i + " ")}
              </h1>
              {item.evolution != null ? (
                <h1>Evolves To: {item.evolution}</h1>
              ) : (
                <></>
              )}
              <div className="flex">
                <h1>
                  HP: {item.hp} Type: {item.types.map((i) => i + " ")}
                </h1>
              </div>
              <h1>Weakness: {item.weak.map((i) => i.type + " " + i.value)}</h1>

              {item.resistance != null ? (
                <h1>
                  {" "}
                  Resistance:
                  {item.resistance.map((i) => i.type + " " + i.value)}{" "}
                </h1>
              ) : (
                <h1>Resistance: None</h1>
              )}
              {item.retreat != null ? (
                <h1>
                  {" "}
                  Retreat Cost: {item.retreatCost} Total -{" "}
                  {item.retreat.map((i) => i + " ")}
                </h1>
              ) : (
                <h1>Retreat Cost: None</h1>
              )}
              <ul>
                <br />
                {item.attacks.map((i) => {
                  return (
                    <div key={i.name}>
                      <h1>Move: {i.name}</h1>
                      {i.damage != "" ? <h1>Damage: {i.damage}</h1> : <></>}
                      <h1>
                        Cost: {i.convertedEnergyCost} Total -{" "}
                        {i.cost.map((i) => i + " ")}
                      </h1>
                      <h1>{i.text}</h1>
                      <br />
                    </div>
                  );
                })}
              </ul>
              <ul>
                {item.rules != null ? (
                  <li>
                    {item.rules.map((i) => {
                      return <h1 key={item.id}>{"Rule - " + i}</h1>;
                    })}
                  </li>
                ) : (
                  <></>
                )}
                {item.cardText != null ? (
                  <h1>Flavor Text: {item.cardText}</h1>
                ) : (
                  <></>
                )}
              </ul>
              <br />
              <h1>ID: {item.id}</h1>
              <h1>Set: {item.set}</h1>
              <h1>Series: {item.series}</h1>
              <h1>
                Rarity: {item.rarity}, Number: {item.setNumber}/{item.setTotal}
              </h1>
              <h1>Release Date: {item.releaseDate}</h1>
              <h1>Artist: {item.artist}</h1>
            </ul>
          ) : (
            <ul></ul>
          )}

          <ul className="text-black font-medium">
            <h1 className=" text-4xl">Market Prices</h1>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
