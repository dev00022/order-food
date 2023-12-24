import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="max-sm:flex-col flex md:hero mt-4">
      <div className="py-8">
        <h1 className="text-4xl font-extrabold">
          Everthing <br />
          is better <br />
          with a <span className="text-red-600">Pizza</span>
        </h1>
        <p className=" my-4 text-gray-500 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          facilis ut
        </p>
        <div className="flex gap-4 text-sm ">
          <button className="bg-red-600 text-white uppercase justify-center items-center flex py-2 rounded-full gap-2">
            Order now
            <Right />
          </button>
          <button className="flex gap-2 py-2 border-0 text-gray-800 font-semibold items-center">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <Image src={"/pizza.png"} width={300} height={150} alt="pizza" />
      </div>
    </section>
  );
}
