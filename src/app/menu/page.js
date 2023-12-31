"use client";
import SectionHeader from "@/components/layout/SectionHeader";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeader mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-8">
              {menuItems?.length > 0 &&
                menuItems
                  .filter((item) => item.category === c._id)
                  .map((m) => (
                    <div key={m._id} className="">
                      <MenuItem {...m} />
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </section>
  );
}
