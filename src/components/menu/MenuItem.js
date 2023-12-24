"use client";
import { CldImage } from "next-cloudinary";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Cross from "../icons/Cross";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { addToCart } = useContext(CartContext);

  function addToCartButtonClick() {
    const hasOptions = sizes.length > 0 && extraIngredientPrices.length > 0;
    console.log({hasOptions});
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success("Added to cart");
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 w-md bg-black/80 flex items-center justify-center">
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg min-w-[30vw] max-w-lg my-8"
          >
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="border-none p-0 m-0 flex justify-end"
            >
              <Cross />
            </button>
            <div>
              <CldImage
                className="max-h-40 w-fit mx-auto rounded-md"
                src={image}
                width={300}
                height={200}
                alt=""
              />
              <h2 className="text-lg font-bold text-center my-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm">{description}</p>
              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                      />{" "}
                      {size.name} Rs
                      {basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Any extras</h3>
                  {extraIngredientPrices.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onClick={(ev) => handleExtraThingClick(ev, size)}
                        name={size.name}
                      />{" "}
                      {size.name} Rs
                      {size.price}
                    </label>
                  ))}
                </div>
              )}
              <button onClick={addToCartButtonClick} className="submit" type="button">
                Add to cart Rs{selectedPrice}
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={addToCartButtonClick} {...menuItem} />
    </>
  );
}
