import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = ["/assets/ad1.jpg", "/assets/ad2.jpg", "/assets/ad3.jpg"];

export default function AdSlider() {
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{height:"650px"}}>
      <AnimatePresence mode="wait">
        <motion.img
         loading="lazy"
          key={index}
          src={images[index]}
          alt={`Slide ${index}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full h-full "
        />
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 transition"
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
