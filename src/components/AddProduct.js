import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    richdescription: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    rating: "",
    numReviews: "",
    isFeatured: false,
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append("image", image);

    try {
      const res = await axiosClient.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("✅ Product added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("❌ Error creating product:", err);
      toast("Failed to create product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-8">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Field */}
        {[
          { name: "name", type: "text", placeholder: "Name", required: true },
          { name: "brand", type: "text", placeholder: "Brand", required: true },
          { name: "price", type: "number", placeholder: "Price", required: true },
          { name: "countInStock", type: "number", placeholder: "Count In Stock", required: true },
          { name: "rating", type: "text", placeholder: "Rating" },
          { name: "numReviews", type: "number", placeholder: "Number of Reviews" },
        ].map(({ name, type, placeholder, required }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />
        ))}

        {/* Textareas */}
        <textarea
          name="description"
          placeholder="Short Description"
          required
          className="md:col-span-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white h-24 resize-none"
          onChange={handleChange}
        />
        <textarea
          name="richdescription"
          placeholder="Rich Description"
          className="md:col-span-2 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white h-24 resize-none"
          onChange={handleChange}
        />

        {/* Category Dropdown */}
       <select
  name="category"
  onChange={handleChange}
  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
  required
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>


        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-gray-700 dark:text-gray-300">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="block w-full text-sm text-gray-900 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
        </div>

        {/* Featured Checkbox */}
        <label className="md:col-span-2 flex items-center space-x-3">
          <input
            type="checkbox"
            name="isFeatured"
            onChange={handleChange}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-800 dark:text-gray-200">Mark as Featured</span>
        </label>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-8 rounded-lg transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
