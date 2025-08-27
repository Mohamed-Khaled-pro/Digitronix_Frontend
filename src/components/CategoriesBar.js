import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import CategoryItem from "./CategoryItem";

export default function CategoriesBar({ onCategorySelect, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient.get("/categories")
      .then((res) => {
        setCategories(res.data) 
        onCategorySelect(selectedCategory)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="w-full py-4 bg-white dark:bg-black">
      <div className="w-full px-2 md:px-20 py-4 flex md:justify-center gap-6 md:gap-8 overflow-x-auto md:overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-snap-x scroll-smooth">
        
        {/* All Category */}
        <CategoryItem
          name="All"
          image="/assets/ALL.png"
          selected={selectedCategory === null}
          onClick={() => onCategorySelect(null)}
        />

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <CategoryItem
            key={cat._id}
            name={cat.name}
            image={cat.image}
            selected={selectedCategory === cat._id}
            onClick={() => onCategorySelect(cat._id)}
          />
        ))}
      </div>
    </div>
  );
}
