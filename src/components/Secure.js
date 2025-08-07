import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    img: "/assets/secure.png",
    title: "Secure Payment",
  },
  {
    img: "/assets/delv.png",
    title: "Fast Delivery",
  },
  {
    img: "/assets/return.png",
    title: "Return Policy ",
  },
  {
    img: "/assets/Warranty.png",
    title: "Warranty Guarantee",
  },
];

export default function Secure() {
  return (
    <div className="my-40 px-4">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
        Why Choose Digitronix?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-800 dark:text-gray-200">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 ,  y: 40 }}
            whileInView={{ opacity: 1, scale: 1 , y:0}}
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.3, delay: index * 0.2 }}
            className="bg-white dark:bg-black shadow-md dark:shadow-gray-900 p-6 rounded-xl cursor-pointer"
          >
            <img
              src={item.img}
              alt={item.title}
              className="mx-auto w-16 h-16 object-contain mb-4"
            />
            <p className="text-lg font-semibold">{item.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
