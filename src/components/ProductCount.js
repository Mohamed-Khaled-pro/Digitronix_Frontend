import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import SyncLoader from 'react-spinners/SyncLoader';

export default function ProductCount() {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // تأكد إن عندك التوكن متوفر هنا
  const token = localStorage.getItem('token'); // أو الطريقة اللي بتخزن بيها التوكن

  useEffect(() => {
    axiosClient
      .get("products/get/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // لو الكوكيز مستخدمة في التوثيق
      })
      .then((res) => {
        setProductCount(res.data.productCount); // تأكد من اسم المفتاح حسب رد السيرفر
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message || "Error fetching product count");
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        {loading ? (
          <div className="text-center mt-20">
            <SyncLoader color="#00FF7F" size={10} />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-black dark:bg-white text-white dark:text-black flex flex-col items-center justify-center shadow-lg ">
            <span className="text-3xl font-bold">{productCount}</span>
            <span className="text-md mt-1">Products</span>
          </div>
        )}
      </div>
    </div>
  );
}
