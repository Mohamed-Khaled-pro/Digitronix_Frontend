import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useUser } from "../context/UserContext";

export default function AuthButtons() {
  const { user } = useUser();

  return (
    <motion.div
      className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-12 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
    {user ? (
  <motion.div
    className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <motion.div
      initial={{ rotate: -15 }}
      animate={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
     
    </motion.div>
    <div className="text-left">
      <p className="text-xl font-bold text-green-700 dark:text-green-300">
        👋 Hello, <span className="underline">{user.name || "User"}</span>
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">
        We're glad to see you
      </p>
    </div>
  </motion.div>
) : (
        <>
          {/* Login */}
          <Link to="/api/users/login" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 w-full justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 dark:from-green-400 dark:to-green-500 dark:text-black"
            >
              <FaSignInAlt className="text-lg" />
              Login
            </motion.button>
          </Link>

          {/* Sign Up */}
          <Link to="/api/users/register" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 w-full justify-center rounded-xl border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold transition duration-300 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-400 dark:hover:text-black"
            >
              <FaUserPlus className="text-lg" />
              Sign Up
            </motion.button>
          </Link>
        </>
      )}
    </motion.div>
  );
}
