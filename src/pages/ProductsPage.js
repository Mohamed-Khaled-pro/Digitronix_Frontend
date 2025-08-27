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
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";

const INITIAL_VISIBLE = 8;

function ProductsPage() {
  const { products, loadingProducts , fetchProducts } = useContext(ProductContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const {user} = useUser();
  const {cart , setCart} = useCart();
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


 const handleAddToCart = (product) => {
  if (!user) {
    return toast.error("You must be logged in to add products to your cart");
  }
  const exist = cart.find((item) => item.id === product._id);
  if (exist) {
    toast("Product already in cart");
    navigate("/cart"); // الأفضل توديه للسلة بدل /api/products
  } else {
    setCart([
      ...cart,
      {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        countInStock: product.countInStock,
      },
    ]);
    toast.success("Product added to cart");
  }
};

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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-3 md:p-1">
        {currentProducts.map((product) => (
          <motion.div
  key={product._id}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
>
  {/* Image */}
  <div className="relative w-full h-64 md:h-72 overflow-hidden group cursor-pointer">
    <img
      src={product.image}
      alt={product.name}
      onClick={() => handleItemClick(product._id)}
      className="w-full h-full  transform group-hover:scale-105 transition-transform duration-300"
    />

    {/* Featured / Tag */}
    {product.isFeatured && (
      <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-1 shadow-lg">
        <FaFire />
        Best Seller
      </div>
    )}
    {product.category?.name === "Deals & Offers" && (
      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-1 shadow-lg">
        <FaTags />
        HOT DEAL
      </div>
    )}
  </div>

  {/* Content */}
  <div className="p-4 flex-1 flex flex-col justify-between">
    <div>
      <h2
        className="text-lg md:text-xl font-semibold mb-1 cursor-pointer hover:text-primaryGreen transition-colors"
        onClick={() => handleItemClick(product._id)}
      >
        {product.name}
      </h2>
      <p
        className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3 cursor-pointer"
        onClick={() => handleItemClick(product._id)}
      >
        {product.description}
      </p>

      {/* Rating */}
      <div className="flex items-center mb-3">
        {Array.from({ length: 5 }, (_, i) =>
          i < Math.floor(product.rating) ? (
            <FaStar key={i} className="text-yellow-400 mr-1" />
          ) : (
            <FaRegStar key={i} className="text-gray-300 mr-1" />
          )
        )}
        <span className="text-gray-500 text-sm ml-2">
          ({product.rating.toFixed(1)})
        </span>
      </div>

      {/* Price */}
      <div className="flex flex-col">
        {product.category?.name === "Deals & Offers" ? (
          <>
            <span className="text-gray-400 line-through text-sm">
              {Math.round(product.price + product.price * 0.2)} EGP
            </span>
            <span className="text-red-600 font-bold text-lg">
              {product.price} EGP
            </span>
            <span className="text-green-600 text-sm font-semibold">
              20% OFF
            </span>
          </>
        ) : (
          <span className="text-gray-900 dark:text-white font-bold text-lg">
            {product.price} EGP
          </span>
        )}
      </div>
    </div>

    {/* Actions */}
    <div className="mt-4 flex justify-between items-center">
      <button
          onClick={() => handleAddToCart(product)}
          className="bg-primaryGreen hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm font-semibold transition-colors" 
        >
          Add to Cart
        </button>
      <div
        className="text-xl cursor-pointer"
        onClick={() => handleFavorite(product._id)}
      >
        {safeFavourites.includes(product._id) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-300 dark:text-gray-400" />
        )}
      </div>
      {user?.isAdmin && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold transition-colors"
          onClick={() => handleRemove(product._id)}
        >
          Remove
        </button>
      )}
    </div>
  </div>
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
