import axios from "axios";


 const axiosClient = axios.create({
  baseURL: "https://backend-production-b65ae.up.railway.app/api", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;