import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch latest stock count
  const refreshStock = async () => {
    try {
      const updatedCart = await Promise.all(
        cart.map(async (item) => {
          const { data } = await axiosClient.get(`/products/${item.id}`);
          return { ...item, countInStock: data.countInStock };
        })
      );
      setCart(updatedCart);
    } catch (err) {
      console.error("Error fetching stock:", err);
    }
  };

  useEffect(() => {
    refreshStock();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product._id);
      if (exist) {
        return prev.map((item) =>
          item.id === product._id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.countInStock || 1),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          id: product._id,
          quantity: 1,
          countInStock: product.countInStock || 1,
        },
      ];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(Number(quantity), item.countInStock || 1),
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
