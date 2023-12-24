"use client";
import { CartContext } from "@/components/AppContext";
import SectionHeader from "@/components/layout/SectionHeader";
import { CldImage } from "next-cloudinary";
import { useContext } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeader mainHeader={"Cart"} />
      </div>
      <div className="mt-4 grid gap-2 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product) => (
              <div key={product._id} className="flex gap-4 border-b py-2 mb-2">
                <div className="w-24">
                  <CldImage
                    src={product.image}
                    alt=""
                    width={240}
                    height={240}
                  />
                </div>
                <div>{product.name}</div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
