import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
export default function SearchBar({ className }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (keywordValue) => {
    try {
      const res = await axiosClient.get("/products/search", {
        params: {
          keyword: keywordValue,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error("❌ Error fetching search results", err);
    }
  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    handleSearch(value);
  };

const handleProduct =(id)=>{
  navigate(`/products/${id}`)
 setKeyword("");    
  setResults([]); 
}

  return (
    <div className={`relative w-full  ${className}`}>
      {/* ✅ input + select في سطر واحد */}
      <div>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primaryGreen dark:bg-darkNavbar dark:text-white dark:border-gray-600"
        />
      </div>

      {/* ✅ نتائج البحث */}
      {keyword && (
        <div className="absolute z-10 w-full bg-white dark:bg-darkNavbar border border-gray-300 dark:border-gray-700 rounded-md mt-2 max-h-64 overflow-y-auto shadow-lg"
        >
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product._id}
                 onClick={()=>handleProduct(product._id)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {product.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
