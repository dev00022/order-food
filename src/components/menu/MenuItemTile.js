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
        <h4 className="font-semibold text-xl my-2">{name}</h4>
        <p className="text-gray-500 my-2 line-clamp-3 h-[70px]">
          {description}
        </p>
        <button
          onClick={() => onAddToCart()}
          className="bg-red-600 flex justify-center items-center max-sm:flex-col text-white rounded-full font-semibold px-6 py-2"
        >
          <span >Add to Cart Rs{basePrice}</span>
          {/* <span >Rs{basePrice}</span> */}
        </button>
      </div>
    )
}