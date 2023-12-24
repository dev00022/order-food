"use client";
import { UseProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItem() {
  const { loading, data } = UseProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex justify-center mx-auto max-w-md">
        <Link className="button" href={"/menu-items/new"}>
          Create new menu item
          <Right />
        </Link>
      </div>
      <div className="max-w-xl mx-auto">
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item</h2>
        <div className="grid grid-cols-3 gap-3">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="mb-1 flex-col bg-gray-200 py-4 rounded-md shadow-lg shadow-rose-200"
                key={item._id}
              >
                <div className="mx-auto w-24 h-24 bg-no-repeat">
                  <CldImage
                    className="object-fill h-full w-full rounded-lg"
                    src={item.image}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="text-center mt-2">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
