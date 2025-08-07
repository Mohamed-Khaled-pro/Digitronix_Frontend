import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function Cart()  {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getTotal = async () => {
      try {
        const { data } = await axiosClient.post("/orders/calculate-total", {
          cartItems: cart,
        });
        setTotal(data.total);
      } catch (err) {
        console.error("Failed to calculate total", err);
      }
    };

    if (cart.length) getTotal();
  }, [cart]);

  const goToCheckout = () => navigate("/checkout");

 return (
 <div className="max-w-6xl mx-auto p-2 text-gray-900 dark:text-gray-100 mb-20">
  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
            Your Cart
        </h1>
        <div className="w-24 h-1 bg-primaryGreen mx-auto mt-3 rounded"></div>
      </motion.div>
  {cart.length === 0 ? (
<div className="flex flex-col justify-center items-center ">
    <img src="/assets/emptyCart.png" alt="Cart Empty"  className="w-80 h-"/>
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">  Your cart is empty </h1>
</div> 
     ) : (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Products List */}
      <div className="md:col-span-2 space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className=" border-b dark:border-gray-700 pb-4 overflow-hidden"
          >
            <div className="flex-row flex justify-center items-center gap-5">
                  <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="w-36 h-40 md:w-100 md:h-40  object-contain rounded-md border dark:border-gray-700"
            />
            <div className="flex-1 gap-10">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-1">
                Price: ${item.price}
              </p>
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2 justify-center items-center">
                <label htmlFor={`qty-${item.id}`} className="text-sm">
                  Quantity:
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min="1"
                  max={item.countInStock}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value));
                    updateQuantity(item.id, value);
                  }}
                  className="w-16 border px-2 py-1 rounded bg-white dark:bg-gray-800 dark:border-gray-600"
                />
                    </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  (Max: {item.countInStock})
                </span>
              </div>
            </div>
            </div>
          
            <div className="flex justify-end p-5 ">
                <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:bg-red-500 hover:text-white  text-sm border-red-500 border-2 p-2"
            >
              Remove
            </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-100 dark:bg-primaryDark p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg md:text-xl mb-6">
          <span>Total Price:</span>
          <span>${total}</span>
        </div>
        <button
          onClick={goToCheckout}
          className="w-full bg-primaryGreen text-dark py-2 px-4 dark:text-black rounded hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )}
</div>
);
}
