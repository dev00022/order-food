import { useState } from "react";
import Plus from "../icons/Plus";
import Trash from "../icons/Trash";
import Up from "../icons/Up";
import Down from "../icons/Down";

export default function MenuItemPriceProps({
  addLabel,
  props,
  setProps,
  name,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addSize() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editSize(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeSize(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-100 p-2 rounded-md mb-4 border border-gray-300">
      <button
        className="p-1 text-gray-700 items-center text-sm border-0 justify-start inline-flex"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen && <Up className="w-5" />}
        {!isOpen && <Down className="w-5" />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editSize(ev, index, "name")}
                />
              </div>
              <div>
                <label htmlFor="">Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editSize(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          onClick={addSize}
          type="button"
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
