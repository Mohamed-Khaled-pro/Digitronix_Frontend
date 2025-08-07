import { createContext, useEffect, useState , useContext} from "react";
import axiosClient from "../api/axiosClient";
export const useProduct = () => useContext(ProductContext);

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // ✅ عرف الدالة برة useEffect
  const fetchProducts = () => {
    setLoadingProducts(true);
    axiosClient.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      })
      .finally(() => setLoadingProducts(false));
  };

  // ⬇️ استدعيها عند التحميل لأول مرة
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loadingProducts, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
 