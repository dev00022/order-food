import { CldImage } from "next-cloudinary";

export default function MenuItemTile({onAddToCart,...item}){
    const {name, image, description , basePrice, sizes, extraIngredientPrices} = item;
    return (
        <div className="bg-gray-200 rounded-lg p-4 text-center hover:bg-white hover:shadow-lg hover:shadow-black/50 transition-all">
        <div className="text-center md:w-40 h-32 items-center overflow-hidden flex mx-auto">
          <CldImage
            className="mx-auto max-h-full rounded-lg items-stretch"
            src={image}
            alt="pizza"
            width={200}
            height={200}
          />
        </div>
        <div className=" mx-auto max-w-[10vw] h-8 justify-center text-red-600 font-bold text-lg items-center"> Rs{basePrice}</div>
        <h4 className="font-semibold text-xl my-2">{name}</h4>
        <p className="text-gray-500 my-2 line-clamp-3 h-[70px]">
          {description}
        </p>
        <button
          onClick={() => onAddToCart()}
          className="bg-red-600 flex justify-center items-center max-sm:flex-col text-white rounded-full font-semibold px-6 py-2"
        >
          <span >Add Item</span>
          {/* <span >Rs{basePrice}</span> */}
        </button>
      </div>
    )
}