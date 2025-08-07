import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CartContext";
import {
  faSun,
  faMoon,
  faUser,
  faCartPlus,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import BottomNav from "./BottomNav";
import { useUser } from "../context/UserContext";
export default function Nav({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); 
  const { cart } = useCart();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/api/products" },
    { name: "Mobiles", path: "/api/products?category=6887d8a1aea846c50447c1d4" },
    { name: "Laptops", path: "/api/products?category=6887d812aea846c50447c1d0" },
    { name: "Computer", path: "/api/products?category=6887d7caaea846c50447c1ce" },
    { name: "Screens", path: "/api/products?category=6887d8dbaea846c50447c1d6" },
    { name: "Camera", path: "/api/products?category=688a2d6869f1fe9f970b3728" },
    { name: "Offers", path: "/api/products?category=6887d9a8aea846c50447c1d8" },
    { name: "Featured", path: "/featured" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Orders", path: "/my-orders" },
      ...(user?.isAdmin ? [{ name: "Admin", path: "/admin-dashboard" }] : [])
  ];

  return (
    <>
      <nav className="bg-white dark:bg-black shadow-md dark:shadow-sm dark:shadow-white md:mt-2 relative">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 md:px-9  gap-10">
          {/* Brand */}
          <div className="text-2xl md:text-3xl font-bold tracking-wider"><Link to="/">
            <span className="text-primaryGreen text-3xl font-bold md:text-4xl">D</span>igitronix
          </Link>
          </div>
              
              {/* Mobile Menu Button */}
              <div className="  md:flex lg:hidden flex  gap-5 items-center">
            <motion.div
            className="flex items-center"
              onClick={() => setDarkMode(!darkMode)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: darkMode ? 180 : 0, 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
            >
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="text-xl lg:text-2xl text-gray-700 dark:text-yellow-500"
              />
            </motion.div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
                  <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>

              </div>


          {/* Search Bar - Desktop only */}
          <div className=" hidden md:hidden lg:block  w-full">
          <SearchBar />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:hidden lg:flex gap-6  cursor-pointer justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.2 }}
            >
              <Link 
              to="/api/users"
              >
              <FontAwesomeIcon icon={faUser} className="text-xl lg:text-2xl" />
              </Link>
            </motion.div>
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.4 }}
  whileHover={{ scale: 1.1 }}
  className="relative cursor-pointer"
>
  <Link to="/cart" className="relative inline-block">
    <FontAwesomeIcon
      icon={faCartPlus}
      className="text-xl lg:text-2xl text-gray-800 dark:text-white"
    />

    {cart.length > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -top-2 -right-2 bg-primaryGreen text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
      >
        {cart.length}
      </motion.span>
    )}
  </Link>
</motion.div>
            <motion.div
            className="flex items-center "
              onClick={() => setDarkMode(!darkMode)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: darkMode ? 180 : 0, 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
            >
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="text-xl lg:text-2xl text-gray-700 dark:text-yellow-500"
              />
            </motion.div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:hidden lg:flex justify-center gap-8 md:gap-6 lg:gap-8 px-5 py-4">
          {navLinks.map((item, index) => (
            <motion.div  key={index} 
            transition={{duration:.5 , ease:"easeInOut" , delay:(index*1.1)-(index)}}
            initial={{opacity:0,y:'-10px'}}
            animate={{opacity:1 , y:0}}
            whileHover={{scale:1.2}}
            
            >
            <Link
              to={item.path}
              className="text-sm md:text-base font-medium border-b-2 border-transparent hover:border-primaryGreen text-gray-700 hover:text-primaryGreen dark:hover:text-primaryGreen dark:text-white transition"
            >
              {item.name}
            </Link>
            </motion.div>
          ))}
        </div>

       

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className=" md:flex lg:hidden bg-white dark:bg-black mt-5  px-5 pb-4 flex flex-col gap-4 shadow-md overflow-hidden"
            >
              {navLinks.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="text-base font-medium text-gray-700 hover:text-primaryGreen dark:text-white dark:hover:text-primaryGreen transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Bottom nav for mobile only */}
      <BottomNav cart={cart} />
    </>
  );
}
