"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";
import Tray from "../icons/Tray";
import SideBar from "./SideBar";
import Cross from "../icons/Cross";
import { CldImage } from "next-cloudinary";
import Cart from "../icons/Cart";

export default function Header() {
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function FetchUser() {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setProfileName(data.name);
        setProfileImage(data.image);
      });
    });
  }

  useEffect(() => {
    FetchUser();
  }, []);

  return (
    <>
      <header className="flex justify-between">
        <nav className="flex gap-8 text-gray-500 font-semibold items-center">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            type="button"
            className="md:hidden border-none p-0 m-0 transition duration-200"
          >
            {!showSidebar ? <Tray /> : <Cross />}
          </button>
          {showSidebar && (
            <div onClick={() => setShowSidebar(false)}>
              <SideBar />
            </div>
          )}
          <Link href="/" className=" text-red-600 font-semibold text-2xl">
            DNY_Resto
          </Link>
          <div className="sm:flex gap-8 mx-2 hidden">
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </div>
        </nav>
        <div className="flex gap-4">
          <nav className=" md:flex gap-4 text-gray-500 items-center font-semibold hidden">
            {status === "authenticated" && (
              <>
                <Link href={"/profile"} className="whitespace-nowrap p-1 m-1">
                  <CldImage
                    className="rounded-full border-gray-700 shadow-sm shadow-black mx-auto"
                    src={profileImage || "vyifgnq3idhbulpyt0ne"}
                    width={80}
                    height={80}
                    alt=""
                  />
                  <span className="text-sm">Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className=" bg-red-600 text-white px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Link href={"/login"}>Login</Link>
                <Link
                  href={"/register"}
                  className=" bg-red-600 text-white px-8 py-2 rounded-full"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
          <div className="flex gap-2 items-center justify-center">
            <Link className="md:hidden" href={"/profile"}>
              <CldImage
                className="rounded-full border-gray-700 shadow-sm shadow-black"
                src={profileImage || "vyifgnq3idhbulpyt0ne"}
                width={40}
                height={40}
                alt=""
              />
            </Link>
            <Link
              className="text-gray-500 relative items-center flex p-2 font-semibold"
              href={"/cart"}
            >
              <Cart />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
