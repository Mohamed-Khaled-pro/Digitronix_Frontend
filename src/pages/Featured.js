import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Featured() {
      const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosClient.get("/products/get/featured");
        setFeatured(res.data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);
  if (loading) return <p className="text-center mt-10 mb-10">Loading...</p>;

  return (
    <div className="px-4 md:px-12 py-10">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
        🌟 Featured Products
      </h2>

      {featured.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No featured products available.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <motion.div
              key={product.id}
              className="border rounded-xl p-4 shadow-md hover:shadow-xl transition dark:bg-gray-900"
              whileHover={{ scale: 1.03 }}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 md:h-60  rounded-md mb-4"
                />
                <h3 className="text-md md:text-2xl font-semibold text-green-700 dark:text-green-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {product.description?.substring(0, 80)}...
                </p>
                <p className="mt-2 font-bold text-lg text-green-600 dark:text-green-400">
                  ${product.price}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
