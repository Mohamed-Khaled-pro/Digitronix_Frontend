import { motion } from "framer-motion";
import { ProductContext } from "../context/ProductContext";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FavouriteContext } from "../context/FavouriteContext";
export default function Wishlist() {
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

 const favProducts = useMemo(() => {
  if (!products || products.length === 0) return [];
  return products.filter((p) => favourites.includes(p._id));
}, [products, favourites]);

if (!products || products.length === 0) {
  return (
    <p className="text-center text-gray-500 dark:text-gray-300 mt-20">
      Loading your favourite products...
    </p>
  );
}

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mx-auto my-20 z-[19]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          Your Favourite Products
        </h1>
        <div className="w-24 h-1 bg-primaryGreen mx-auto mt-3 rounded"></div>
      </motion.div>

      {favProducts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No favourites yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 p-5">
          {favProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-black rounded-2xl shadow p-0 transition hover:scale-105"
            >
              <img
                onClick={() => handleClick(product._id)}
                src={product.image}
                alt={product.name}
                className="w-full h-48 md:h-72 cursor-pointer bg-white rounded-xl"
              />
              <div className="p-4 h-40">
                <h2 className="text-md font-semibold mt-2 text-black dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-5">
                  {product.price} EGP
                </p>
              </div>

              <div className="w-full bg-red-500 text-center cursor-pointer"    onClick={() =>
                    setFavourites((prev) =>
                      prev.filter((id) => id !== product._id)
                    )
                  }>
                <button
                  className="text-white dark:text-black font-bold p-2 mt-2"
               
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
