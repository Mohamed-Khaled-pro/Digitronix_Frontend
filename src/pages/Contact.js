import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useEffect } from "react"; 
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
export default function Contact() {
  const { user } = useUser();
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name:  "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

 useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsError(false);
   toast.success("Thank you for your message");
   navigate("/")
  };

  return (
    <div className="max-w-xl mx-auto mt-20 px-4 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <form
        action="https://formspree.io/f/xovlkqlr"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded h-32"
        />

        <button
          type="submit"
          className="bg-primaryGreen hover:bg-green-700 font-bold text-black dark:text-white px-6 py-2 rounded w-full"
        >
          Send
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-sm text-center ${
            isError ? "text-red-500" : "text-green-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
