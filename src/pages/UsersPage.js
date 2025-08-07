import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext"; // ← الكونتكست
import axiosClient from "../api/axiosClient"; // ← تأكد إن الملف ده موجود
import { toast } from "react-toastify";

export default function UsersPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await axiosClient.post("/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      toast.success(" Logged out successfully");
    } catch (err) {
      console.error("خطأ أثناء تسجيل الخروج:", err);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="mt-24 md:mt-36 flex items-center justify-center dark:bg-black mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-48 p-8   ">
        {!user ? (
          <>
            {/* زر تسجيل الدخول */}
            <button
              onClick={() => navigate("/api/users/login")}
              className="flex flex-col items-center justify-center bg-white dark:bg-black dark:shadow-lg  shadow-lg hover:shadow-2xl rounded-xl p-10 transition duration-300 cursor-pointer text-gray-800 dark:text-white text-2xl font-semibold hover:bg-primaryGreen hover:text-white dark:hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="text-5xl md:text-8xl mb-4" />
              Login
            </button>

            {/* زر تسجيل حساب */}
            <button
              onClick={() => navigate("/api/users/register")}
              className="flex flex-col items-center justify-center bg-white dark:bg-black shadow-lg shadow-lg hover:shadow-2xl rounded-xl p-10 transition duration-300 cursor-pointer text-gray-800 dark:text-white text-2xl font-semibold hover:bg-primaryGreen hover:text-white dark:hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faUserPlus} className="text-5xl md:text-8xl mb-4" />
              Register
            </button>
          </>
        ) : (
          <>
            {/* زر الملف الشخصي */}
            <button
              onClick={() => navigate("/api/users/profile")}
              className=" dark:shadow-md dark:shadow-inner dark:shadow-primaryGreen flex flex-col items-center justify-center bg-white dark:shadow-lg dark:bg-primaryDark shadow-lg hover:shadow-2xl rounded-xl p-10 transition duration-300 cursor-pointer text-gray-800 dark:text-white text-2xl font-semibold hover:bg-primaryGreen hover:text-white dark:border-2 dark:border-primaryGreen dark:hover:bg-primaryGreen"
            >
              <FontAwesomeIcon icon={faUserCircle} className="text-5xl md:text-8xl mb-4" />
              Profile
            </button>

            {/* زر تسجيل الخروج */}
            <button
              onClick={handleLogout}
              className="dark:shadow-md dark:shadow-inner dark:shadow-red-600 flex flex-col items-center justify-center bg-white dark:border-2 dark:border-red-600 dark:bg-primaryDark shadow-lg hover:shadow-2xl rounded-xl p-10 transition duration-300 cursor-pointer text-gray-800 dark:text-white text-2xl font-semibold hover:bg-red-600 hover:text-white dark:hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-5xl md:text-8xl mb-4" />
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
