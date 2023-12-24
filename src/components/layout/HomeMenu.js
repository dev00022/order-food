'use client'
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(()=>{
    fetch('/api/menu-items').then(res=>{
      res.json().then(
        menuItems => {
          const sellers = menuItems.slice(-3);
          setBestSellers(sellers);
          console.log(sellers);
        }
      )
    })
  },[]);

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start -z-10 ">
        <div className="absolute left-0 -top-[70px] text-left">
          <Image src={"/sallad1.png"} alt="sallad" width={109} height={189} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={"/sallad2.png"} alt="sallad" width={107} height={195} />
        </div>
      </div>
      <div className="text-center mb-4 pt-8">
        <SectionHeader subHeader="Check Out" mainHeader="Our Best Sellers" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {bestSellers?.length >0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item}/>
        ))}
      </div>
    </section>
  );
}
