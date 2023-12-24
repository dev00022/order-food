"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [image, setImage] = useState('');
  const [name, setName] = useState("");
  useEffect(() => {
    fetch("/api/profile").then((res) => {
      res.json().then((data) => {
        setImage(data.image);
        setName(data.name);
      });
    });
  });
  return (
    <div className=" pt-8 fixed flex justify-center w-full h-[93vh] top-[7vh] left-0 bg-white">
      <div className="grow flex items-center flex-col font-bold text-2xl gap-5 sidebar">
        <Link
          className=" flex items-center gap-4"
          type="button"
          href={"/profile"}
        >
          <CldImage
            className="rounded-full"
            src={image? image : 'vyifgnq3idhbulpyt0ne'}
            width={70}
            height={70}
            alt="profile"
          />
          <span className="link">{name}</span>
        </Link>
        <div className="flex justify-center items-center mt-20 flex-col gap-16">
          <Link className="link" href={"/"}>
            Home
          </Link>
          <Link className="link" href={"/menu"}>
            Menu
          </Link>
          <Link className="link" href={"/#about"}>
            About
          </Link>
          <Link className="link" href={"/#contact"}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
