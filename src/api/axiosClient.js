import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://backend-production-b65ae.up.railway.app/api",
  withCredentials: true, // عشان الكوكي يروح مع كل طلب
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor للردود
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
       localStorage.clear();
      sessionStorage.clear();
      // استدعاء API الـ logout في الباك إند
      axiosClient.post("/users/logout").finally(() => {
        window.location.href = "api/users/login"; // إعادة توجيه لصفحة تسجيل الدخول
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
