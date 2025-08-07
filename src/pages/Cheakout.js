import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
export default function Checkout() {
  const [form, setForm] = useState({
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    country: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setForm({
        name : user.name,
        shippingAddress1: user.street || "",
        shippingAddress2: user.apartment || "",
        city: user.city || "",
        country: user.country || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!cart.length) return setError("Your cart is empty.");

  try {
    const orderItemsPayload = cart.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    const {name, shippingAddress1, shippingAddress2, city, country, phone } = form;

    const response = await axiosClient.post("/orders", {
      orderItems: orderItemsPayload,
      name,
      shippingAddress1,
      shippingAddress2,
      city,
      country,
      phone,
      status: "pending",
      user: user._id,
    });

    console.log("Order successful:", response.data);
    clearCart();
    navigate("/my-orders");
  } catch (error) {
    console.error("Checkout error:", error);
  }
};

  return (
    <div className="max-w-xl mx-auto p-1 text-gray-900 dark:text-gray-100">
  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
            Checkout
        </h1>
        <div className="w-24 h-1 bg-primaryGreen mx-auto mt-3 rounded"></div>
      </motion.div>      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="text"
          name="shippingAddress1"
          placeholder="Address 1"
          value={form.shippingAddress1}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="text"
          name="shippingAddress2"
          placeholder="Address 2"
          value={form.shippingAddress2}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          minLength={11}
          maxLength={11}
          className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-600"
        />
             <button
          type="submit"
          className="bg-primaryGreen text-black   w-full py-2 rounded hover:bg-gray-800 transition"
        >
          Place Order
        </button>
       
      </form>
    </div>
  );
}
