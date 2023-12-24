"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});
export function AppProvider({ children }){
    const [cartProducts, setCartProducts] = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage: null;
    
    useEffect(()=>{
      if(ls && ls.getItem('cart')){
        setCartProducts(JSON.parse(ls.getItem('cart')));
      }
    },[]);

    function clearCart(){
      setCartProducts([]);
      saveCartProducts([]);
    }

    function removeCartProduct(indexToR){
      setCartProducts(prevCartProducts => {
        const newCartProducts = prevCartProducts.filter((v,index) => index !== indexToR);
        saveCartProducts(newCartProducts);
        return newCartProducts;
      })
    }

    function saveCartProducts(){
      if(ls){
        ls.setItem('cart', JSON.stringify(cartProducts));
      }
    }

    function addToCart(product, size=null, extras=[]){
        setCartProducts(prevProducts => {
            const cartProducts = {...product, size, extras};
            const newProducts =[...prevProducts, cartProducts];
            return newProducts;
        })
    }
  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeCartProduct,
        clearCart,
      }}>{children}</CartContext.Provider>
    </SessionProvider>
  );
}
