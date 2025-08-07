import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function Profile() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // في حالة تم تحديث الصفحة أو فُقد الـ context
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, [user, setUser]);

  if (loading) return <p className="text-center mt-10 text-gray-600">جاري التحميل...</p>;

if (!user)
  return (
    <p className="mt-20 text-center text-lg font-semibold text-red-600 bg-red-100 py-4 px-6 rounded-xl max-w-md mx-auto shadow-md">
      You are not logged in.
    </p>
  );
  return (
    <div className="flex justify-center items-center mt-24 px-4">
      <div className="bg-white dark:bg-black shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <FaUserCircle className="text-7xl text-primaryGreen dark:text-white" />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.isAdmin ? "مسئول" : "مستخدم"}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4 text-sm text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primaryGreen" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-primaryGreen" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-primaryGreen" />
            <span>{user.country} - {user.city}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-primaryGreen" />
            <span>{user.street}, {user.apartment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
