import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import Nav from "./components/Nav";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./pages/NotFound";
import ProductItem from "./pages/ProductItem";
import Wishlist from "./pages/WishList";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Cheakout from "./pages/Cheakout";
import OrderPage from "./pages/OrdersPage";
import Contact from "./pages/Contact";
import Featured from "./pages/Featured";
import AdminOrderDetails from "./components/AdminOrderDetails";
import { useUser } from "./context/UserContext";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { user } = useUser();
  // Add/remove dark class on document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Check if current route is NotFound (fallback: *)

  return (
    <div className="App">
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/users" element={<UsersPage />} />
        {!user && (
          <>
            <Route path="api/users/login" element={<Login />} />
            <Route path="api/users/register" element={<Register />} />
          </>
        )}
        <Route path="api/users/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Cheakout />} />
        <Route path="/my-orders" element={<OrderPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
        <Route path="api/products" element={<ProductsPage />} />
        <Route
          path="admin-dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />{" "}
        <Route path="products/:id" element={<ProductItem />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
