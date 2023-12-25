"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { UseProfile } from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInput";
import SectionHeader from "@/components/layout/SectionHeader";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }
  const {data: profileData} = UseProfile();
  const [adress, setAdress] = useState({});

  useEffect(()=> {
    if(profileData?.city) {
      const {phone, streetAdress, city, postalCode, country} = profileData;
      const addressFromProfile = {
        phone,
        streetAdress,
        city,
        postalCode,
        country
      };
      setAdress(addressFromProfile);
    }
  },[profileData]);
  
  function handleAddressChange(propName, value){
    setAdress(prevAddress => ({...prevAddress, [propName]:value}));
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeader mainHeader={"Cart"} />
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex gap-4 border-b py-2 mb-2 items-center"
              >
                <div className="w-24 h-20">
                  <CldImage
                    className="w-full h-full rounded-lg "
                    src={product.image}
                    alt=""
                    width={120}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-gray-500">
                      {product.extras?.map((extra) => (
                        <div key={extra._id}>
                          <span>Extra: </span>
                          {extra.name} Rs {extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  Rs{cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">Rs{total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="">
            <h2 className="mx-auto font-semibold">Checkout</h2>
            <form action="">
              <AddressInputs adressProps={adress}
              setAdressProps={handleAddressChange}
              />
              <button type="button" className="bg-red-600 text-white" onClick={()=> toast.success('Order Placed')}>Pay Rs{total}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
