import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
export default function Login() {
  const { setUser } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/users/login", form, {
        withCredentials: true, // مهم علشان يرسل الكوكيز
      });

      console.log("Returned user from login:", res.data);

      if (res.status === 200) {
        const userData = res.data.user; // البيانات من السيرفر

        localStorage.setItem("user", JSON.stringify(userData)); // خزّنها في localStorage
        setUser(userData); // خزّنها في context
        toast.success("Login successfully")
        
        navigate("/"); // روح على صفحة البروفايل
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(" Login Failed ")
    }
  };

  return (
    <div className="mt-28 dark:bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-black shadow-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-primaryGreen hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
