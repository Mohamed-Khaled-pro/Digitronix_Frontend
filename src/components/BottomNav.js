import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function BottomNav({cart}) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-darkNavbar shadow-inner border-t border-gray-200 dark:border-gray-700 z-50 md:block lg:hidden">
      <div className="flex justify-around items-center py-2">
        {/* Home */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition ${
                isActive ? "text-primaryGreen" : "text-gray-700 dark:text-white"
              }`
            }
          >
            <FontAwesomeIcon icon={faHome} className="text-lg mb-1" />
            Home
          </NavLink>
        </motion.div>

        {/* Cart */}
        <motion.div whileTap={{ scale: 0.95 }} className="relative">
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition duration-300 ${
            isActive ? "text-primaryGreen" : "text-gray-700 dark:text-white"
          }`
        }
      >
        <FontAwesomeIcon icon={faCartShopping} className="text-lg mb-1" />
        Cart

        {cart.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-1 -right-2 bg-primaryGreen text-black dark:text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md"
          >
            {cart.length}
          </motion.span>
        )}
      </NavLink>
    </motion.div>
  

        {/* Profile */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <NavLink
            to="api/users"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition ${
                isActive ? "text-primaryGreen" : "text-gray-700 dark:text-white"
              }`
            }
          >
            <FontAwesomeIcon icon={faUser} className="text-lg mb-1" />
            Profile
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
}
