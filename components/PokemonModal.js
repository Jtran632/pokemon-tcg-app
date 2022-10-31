import { useContext } from "react";
import Image from "next/image";
import { PokemonContext } from "./pokemonContext";
function PokemonModal({ object: item }) {
  const { setShowModal, setActivePokemonObject } = useContext(PokemonContext);
  return (
    <div className="PokemonModal border-8 border-black rounded text-white p-2">
      <div>
        <button
          className="bg-transparent  text-white font-bold text-4xl py-1 px-2 border-b-3 modalbtn"
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
            <ul className="font-medium">
              <h1 className="text-2xl">{item.name}</h1>
              <h1>
                {item.superType} - {item.subTypes.map((i) => i + " ")}
              </h1>

              <div className="flex">
                <h1>
                  HP: {item.hp} Type: {item.types.map((i) => i + " ")}
                </h1>
              </div>
              {item.weak != null ? (
                <h1>
                  Weakness: {item.weak.map((i) => i.type + " " + i.value)}
                </h1>
              ) : (
                <h1>Weakness: None</h1>
              )}
              {item.resistance != null ? (
                <h1>
                  Resistance:
                  {item.resistance.map((i) => i.type + " " + i.value)}{" "}
                </h1>
              ) : (
                <h1>Resistance: None</h1>
              )}

              {item.retreat != null ? (
                <h1>
                  Retreat Cost: {item.retreatCost} Total -{" "}
                  {item.retreat.map((i) => i + " ")}
                </h1>
              ) : (
                <h1>Retreat Cost: None</h1>
              )}
              {item.evolution != null ? (
                <div>
                  <h1>Evolves To: </h1>
                  <h1>{item.evolution.map((i) => i + " ")}</h1>
                </div>
              ) : (
                <></>
              )}
              <ul>
                {item.abilities != null ? (
                  <div>
                    <br />
                    {item.abilities.map((i) => {
                      return (
                        <div key={i.name}>
                          <h1>
                            {i.type} - {i.name}
                          </h1>
                          <h1>{i.text}</h1>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </ul>
              <ul>
                {item.attacks != null ? (
                  <div>
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
                  </div>
                ) : (
                  <></>
                )}
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
                {item.cardFlavorText != null ? (
                  <h1>Flavor Text: {item.cardFlavorText}</h1>
                ) : (
                  <></>
                )}
                {item.cardText != null ? <h1>Text: {item.cardText}</h1> : <></>}
              </ul>
              <br />
            </ul>
          ) : (
            <></>
          )}

          <ul className="font-medium">
            <h1 className=" text-2xl">Card Info</h1>
            <h1>ID: {item.id}</h1>
            <h1>Set: {item.set}</h1>
            <h1>Series: {item.series}</h1>
            <h1>
              Rarity: {item.rarity}, Number: {item.setNumber}/{item.setTotal}
            </h1>
            <h1>Release Date: {item.releaseDate}</h1>
            <h1>Artist: {item.artist}</h1>
            <br />

            <h1 className=" text-2xl">TCGPLAYER</h1>
            {item.tcgplayer != null ? (
              <div>
                <a
                  href={item.tcgplayer.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className=" underline"
                >
                  View at TCGPLAYER
                </a>
                <h1>Last Updated: {item.tcgplayer.updatedAt}</h1>

                <h1>
                  {Object.keys(item.tcgplayer.prices).map((keyName, i) => (
                    <li className=" -" key={i}>
                      <div>{keyName}</div>
                      <span className="grid grid-cols-4">
                        <h1>Low: ${item.tcgplayer.prices[keyName].low}</h1>
                        <h1>Mid: ${item.tcgplayer.prices[keyName].mid}</h1>
                        <h1>High: ${item.tcgplayer.prices[keyName].high}</h1>
                        <h1>
                          Market: ${item.tcgplayer.prices[keyName].market}
                        </h1>
                      </span>
                    </li>
                  ))}
                </h1>
              </div>
            ) : (
              <h1>No Info</h1>
            )}
            <br />

            <h1 className=" text-2xl">CARDMARKET</h1>
            {item.cardmarket != null ? (
              <div>
                <a
                  href={item.cardmarket.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className=" underline"
                >
                  View at CARDMARKET
                </a>
                <h1>Last Updated: {item.cardmarket.updatedAt}</h1>
                <h1 className="grid grid-cols-3 min-content">
                  {Object.keys(item.cardmarket.prices).map((keyName, i) => (
                    <li key={i}>
                      <div className=" underline">{keyName}</div>
                      <h1>{item.cardmarket.prices[keyName]}€</h1>
                    </li>
                  ))}
                </h1>
              </div>
            ) : (
              <h1>No Info</h1>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
