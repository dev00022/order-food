import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./menuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || null);
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
 
  useEffect(()=>{
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  });

  return (
    <form
      onSubmit={(ev) => onSubmit(ev, { image, name, description, basePrice, sizes, extraIngredientPrices, category})}
      className="mt-8 max-w-lg mx-auto"
    >
      <div className="md:flex items-start gap-4">
        <div className="w-32 rounded-2xl mt-4 mx-auto">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label htmlFor="">Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label htmlFor="">Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories.length >0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label >Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label htmlFor="">Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <label>Sizes</label>
          <MenuItemPriceProps name={'Sizes'} props={sizes} addLabel={'Add item size'} setProps={setSizes}/>
          <label htmlFor="">Extra ingredients</label>
          <MenuItemPriceProps name={'Extra ingredients'} props={extraIngredientPrices} addLabel={'Add ingredients prices'} setProps={setExtraIngredientPrices}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
