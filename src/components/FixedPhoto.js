import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function FixedPhoto() {
  const navigate = useNavigate();
  return (
    <div className="Main-Container w-full overflow-hidden mb-52">
      <motion.div
        className="w-full h-[300px] md:h-[500px]  md:bg-fixed bg-cover bg-center  bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/background1.jpg')" }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      ></motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mt-10 px-6 ">
        {[
          { src: "/assets/headphone.avif", alt: "Headphones" },
          { src: "/assets/laptop3.jpg", alt: "Laptop" },
          { src: "/assets/iphone.jpg", alt: "iPhone" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="w-full h-60 md:h-80"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full  rounded-xl shadow-lg"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
