import  { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Register() {
      const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    apartment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/users/register", form); // POST للباك إند  
      if (res.status === 201) {
         navigate("/api/users/login");
         toast.success("Registration successful");

}    
    }catch (error) {
  console.error("Registration error:", error.response?.data || error.message);
  toast.error(error.response?.data?.message);
}
  };

  return (
    <div className="mt-20 dark:bg-black flex items-center justify-center px-4 mb-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white dark:bg-black p-8 shadow-white rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Register New User
        </h2>

        {[
          { name: "name", placeholder: "Full Name", type: "text" },
          { name: "email", placeholder: "Email Address", type: "email" },
          { name: "password", placeholder: "Password", type: "password" },
          { name: "phone", placeholder: "Phone Number", type: "text" },
          { name: "country", placeholder: "Country", type: "text" },
          { name: "city", placeholder: "City", type: "text" },
          { name: "street", placeholder: "Street", type: "text" },
          { name: "apartment", placeholder: "Apartment", type: "text" },
        ].map((input) => (
          <input
            key={input.name}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={form[input.name]}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-primaryGreen hover:bg-green-700 text-dark darK:text-black font-semibold py-2 px-4 rounded-md transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
