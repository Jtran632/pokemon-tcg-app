import { useContext } from "react";
import { PokemonContext } from "./pokemonContext";

export default function DropDown({items , num}) {
  const { setCardType, setFilterType, setOrder} = useContext(PokemonContext);
  const setSelector = (val) =>{
    switch (num) {
      case 1:
        return setCardType(val);
      case 2:
        return setFilterType(val);
      case 3:
        return setOrder(val);
    }
  };

  return (
    <div>
      <select
        className="text-black bg-white border rounded-sm focus:border-green-600"
        onChange={(e) => setSelector(e.target.value)}
      >
        {Object.keys(items).map((key) => {
          return (
            <option value={items[key]} key={key}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}
