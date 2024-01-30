import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-sm:flex-col flex md:hero mt-4">
      <div className="py-8">
        <h1 className="text-4xl font-extrabold">
        Food is our <br />
        common ground,<br />
        a universal <span className="text-red-600"> experience.</span>
        </h1>
        <p className=" my-4 text-gray-500 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          facilis ut
        </p>
        <div className=" lg:w-[30vw] md:w-[45vw] flex gap-2 text-sm ">
          <Link href={'/menu'} className=" w-[40%] bg-red-600 text-white font-semibold uppercase justify-center items-center flex py-2 rounded-full gap-2">
            Order now
            <Right />
          </Link>
          <Link href={'#about'} className="flex w-[40%] gap-2 py-2 border-0 text-gray-800 justify-center font-semibold items-center">
            Learn more
            <Right />
          </Link>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <Image src={"/cake.png"} width={400} height={300} alt="pizza" />
      </div>
    </section>
  );
}
