import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaMobileAlt,
  FaPlaystation,
  FaLaptopCode,
  FaHeadphonesAlt,
  FaCamera,
  FaTags
} from "react-icons/fa";
import SearchBar from "./SearchBar";

export default function HeroSec() {
  return (
    <div className="mt-5 md:mt-20 w-full  dark:bg-black px-4 md:px-20 py-16 text-black dark:text-white mb-20 md:mb-20">
      {/* العنوان + الوصف */}
      <div className="max-w-7xl mx-auto flex flex-col gap-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-8xl font-extrabold leading-tight "
        >
          The Best Electronics 
        </motion.h1>
    
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm md:text-xl max-w-4xl mx-auto"
        >
          Browse our premium selection of smartphones, laptops, tablets, and
          accessories — all available at unbeatable prices with fast delivery.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 0.95 }}
        >
          <Link
            to="/api/products"
            className="inline-block bg-primaryGreen dark:bg-primaryGreen hover:bg-black dark:hover:bg-white text-white  dark:text-black px-4 py-2 md:px-8 md:py-3 mt-4 md:mt-8 rounded-md font-bold shadow  transition"
          >
            Shop Now
          </Link>
        </motion.div>
        <div className=" block md:hidden">
        <SearchBar />
        </div>
      </div>

      {/* Icons Row */}
      <motion.div
        className=" mt-16 md:mt-16 flex justify-center gap-6 text-3xl md:gap-10 md:text-4xl text-black/80 dark:text-white/80 "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Link to="/api/products?category=6887d8a1aea846c50447c1d4">
          {" "}
          <FaMobileAlt
            title="Smartphones"
            className="hover:text-primaryGreen cursor-pointer"
          />
        </Link>
        
        <Link to="/api/products?category=6887d812aea846c50447c1d0">
          {" "}
          <FaLaptopCode
            title="Laptops"
            className="hover:text-primaryGreen cursor-pointer"
          />
        </Link>
        <Link to="/api/products?category=688a392169f1fe9f970b37ff">
          <FaPlaystation
            title="PlayStation "
            className="hover:text-primaryGreen cursor-pointer"
          />
        </Link>
        <Link to="/api/products?category=688a2d6869f1fe9f970b3728">
          <FaCamera
            title="Camera"
            className="hover:text-primaryGreen cursor-pointer"
          />
        </Link>
        <Link to="/api/products?category=6887d84eaea846c50447c1d2">
          <FaHeadphonesAlt
            title="Accessories"
            className="hover:text-primaryGreen cursor-pointer"
          />
        </Link>
        <Link to="/api/products?category=6887d9a8aea846c50447c1d8">
          <FaTags
            title="Discount"
            className="hover:text-primaryGreen cursor-pointer"
          />
        </Link>
      </motion.div>
    </div>
  );
}
