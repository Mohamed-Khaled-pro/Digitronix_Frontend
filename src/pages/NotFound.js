import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <FaExclamationTriangle className="text-yellow-500 text-7xl mb-4" />
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="bg-primaryGreen hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
