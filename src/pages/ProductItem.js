import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { FaStar, FaRegStar } from "react-icons/fa";
import SyncLoader from "react-spinners/SyncLoader";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

export default function ProductItem() {
  const { cart, setCart } = useCart();
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <SyncLoader color="#00FF7F" size={20} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-600">Product not found.</div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      return toast.error("You must be logged in to add products to your cart");
    }

    const exist = cart.find((item) => item.id === product._id);
    if (exist) {
      toast("Product already in cart");
       navigate('/api/products')

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

  return (
    <div className="max-w-6xl mx-auto my-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Product Image */}
      <div className="bg-white dark:bg-black p-4 rounded-2xl shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] md:h-[450px] rounded-2xl"
        />
      </div>

      {/* Product Details */}
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow space-y-4 text-black dark:text-white mb">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex justify-between items-center">
          {/* Rating */}
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) =>
              i < Math.floor(product.rating) ? (
                <FaStar key={i} className="text-yellow-400" />
              ) : (
                <FaRegStar key={i} className="text-gray-300" />
              )
            )}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating?.toFixed(1)} ({product.numReviews} reviews)
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-700">
          Brand: <strong>{product.brand}</strong>
        </p>
        <p className="text-gray-800 text-lg dark:text-gray-300">
          {product.description}
        </p>
        <p className="text-lg italic text-gray-800 dark:text-gray-300">
          {product.richdescription}
        </p>
        <p className="text-xl font-bold text-green-600 dark:text-green-400">
          {product.price} EGP
        </p>
        <p className="text-md">
          In Stock: <strong>{product.countInStock}</strong>
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full py-3 text-black dark:text-white bg-primaryGreen hover:bg-green-700 
          dark:bg-primaryGreen dark:hover:bg-green-600 text-dark dark:text-white transition-all rounded-lg font-semibold`}
          disabled={product.countInStock === 0}
        >
          {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
