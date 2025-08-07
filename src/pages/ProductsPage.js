import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SyncLoader from "react-spinners/SyncLoader";

import {
  FaStar,
  FaRegStar,
  FaFire,
  FaTags,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import CategoriesBar from "../components/CategoriesBar";
import { ProductContext } from "../context/ProductContext";
import { FavouriteContext } from "../context/FavouriteContext";
import { useUser } from "../context/UserContext";
import axiosClient from "../api/axiosClient";

const INITIAL_VISIBLE = 8;

function ProductsPage() {
  const { products, loadingProducts , fetchProducts } = useContext(ProductContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const {user} = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const selectedCategory = searchParams.get("category");
  const safeFavourites = favourites || [];

  // فلترة المنتجات حسب الكاتيجوري
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category._id === selectedCategory)
    : products;

  // reset visible when category changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [selectedCategory]);

  const currentProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(filteredProducts.length, prev + INITIAL_VISIBLE)
    );
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleCategorySelect = (category) => {
    if (category) setSearchParams({ category });
    else setSearchParams({});
  };

  const handleItemClick = (id) => navigate(`/products/${id}`);

  const handleFavorite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  if (loadingProducts) {
    return (
      <div className="text-center mt-20">
        <SyncLoader color="#00FF7F" size={20} />
      </div>
    );
  }
 const handleRemove = async (id) => {
  try {
    await axiosClient.delete(`/products/${id}`);
      fetchProducts();
  } catch (err) {
    console.error("Failed to delete:", err);
  }
}
  return (
    <div className="container mx-auto my-20" style={{ zIndex: "19" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          Our Products
        </h1>
        <div className="w-24 h-1 bg-primaryGreen mx-auto mt-3 rounded"></div>
      </motion.div>

      <CategoriesBar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-1">
        {currentProducts.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mb-5 border-2 border-primaryGreen rounded shadow hover:shadow-lg transition flex flex-col "
          >
            <div className=" h-48 md:h-80 cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => handleItemClick(product._id)}
                className="w-full h-48 md:h-72 mb-3  bg-white cursor-pointer "
              />
            </div>

            <div className="p-2 md:p-4 flex-1 ">
              <h2 className="text-lg md:text-xl font-bold mt-5 mb-2 cursor-pointer font-sans font-bold"                 onClick={() => handleItemClick(product._id)}
>
                {product.name}
              </h2>
              <p className="text-gray-400 mb-2 text-sm line-clamp-2 cursor-pointer"                 onClick={() => handleItemClick(product._id)}
>
                {product.description}
              </p>

              <div className="flex items-center justify-center mb-2">
                {Array.from({ length: 5 }, (_, i) =>
                  i < Math.floor(product.rating) ? (
                    <FaStar key={i} className="text-yellow-400 text-md" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                  )
                )}
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating.toFixed(1)})
                </span>
              </div>

              {product.category?.name === "Deals & Offers" ? (
                <>
                  <div className="absolute top-0 left-0 m-2 flex items-center gap-1 bg-gradient-to-r from-red-600 to-yellow-400 text-white px-2 py-1 rounded-tr-xl rounded-bl-xl shadow-lg z-10">
                    <FaTags className="text-xs md:text-lg" />
                    <span className="text-xs md:text-sm font-bold">
                      HOT DEAL
                    </span>
                  </div>

                  <div className="mb-4 mt-4 md:mt-10 mb-5">
                    <p className="text-sm text-gray-500 line-through">
                      {Math.round(product.price + product.price * 0.2)} EGP
                    </p>
                    <p className="text-lg text-red-600 font-bold">
                      {product.price} EGP
                    </p>
                    <p className="text-green-600 text-sm font-semibold">
                      20% OFF
                    </p>
                  </div>
                </>
              ) : (
                <p className="font-bold text-lg md:text-xl mt-8 mb-5">
                  {product.price} EGP
                </p>
              )}
            </div>

            {product.isFeatured && (
              <div
                dir="rtl"
                className="absolute  top-44 md:top-0 right-0 bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-xs md:text-sm font-bold text-white px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-lg animate-pulse z-10"
              >
                <FaFire className="text-base md:text-lg" />
                Best Seller
              </div>
            )}

            <div
              dir="rtl"
              className="absolute bottom-0 lg:top-0 right-0 text-xl md:text-2xl p-2 md:p-4 "
              onClick={() => handleFavorite(product._id)}
            >
              {safeFavourites.includes(product._id) ? (
                <FaHeart className="text-red-600 cursor-pointer" />
              ) : (
                <FaRegHeart className="text-gray-300 cursor-pointer" />
              )}
            </div>
            {user?.isAdmin && (
<button
  className="bg-red-500 text-white px-3 py-1 rounded "
  onClick={() => handleRemove(product._id)}
>
  Remove
</button>            )}
          </motion.div>
        ))}
      </div>

      {/* Load more / Show less */}
      <div className="flex justify-center mt-6">
        {visibleCount < filteredProducts.length ? (
          <button
            onClick={handleLoadMore}
            className="bg-primaryGreen hover:bg-green-700  text-black font-bold py-2 px-6 rounded shadow"
          >
Show More          </button>
        ) : filteredProducts.length > INITIAL_VISIBLE ? (
          <button
            onClick={handleShowLess}
            className="bg-gray-300 hover:bg-gray-400 text-black  font-bold py-2 px-6 rounded shadow"
          >
       Show Less
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ProductsPage;
