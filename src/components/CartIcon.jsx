import React from "react";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items.length);

  return (
    <div className="relative">
      <TiShoppingCart className="icon text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-white" />
      {cartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {cartItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
