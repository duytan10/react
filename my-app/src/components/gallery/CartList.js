import React from "react";
import { useGallery } from "../../contexts/galleryContext";

const CartList = () => {
  const { cartItems, removeFromCart } = useGallery();
  return (
    <div className="flex flex-col items-start gap-5 px-5 py-10">
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div
            className="flex items-center justify-between gap-x-5"
            key={item.id}
          >
            <img
              src={item.url}
              alt=""
              className="object-cover w-10 h-10 rounded-full"
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-3 text-sm font-semibold text-white bg-red-400 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default CartList;
