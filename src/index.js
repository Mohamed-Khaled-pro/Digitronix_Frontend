import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { FavouriteProvider } from "./context/FavouriteContext"; 
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <FavouriteProvider>
            <>
              <App />
              <ToastContainer 
                position="top-right"          // موقع التوست في الشاشة (أعلى يمين)
                autoClose={3000}             // يغلق تلقائيًا بعد 3 ثواني
                hideProgressBar={false}      // يظهر شريط التقدم
                newestOnTop={false}          // يظهر التوست القديم أولًا
                closeOnClick                 // يغلق بالتأكيد عند الضغط عليه
                rtl={false}                  // اتجاه النص من اليسار لليمين
                pauseOnFocusLoss             // يوقف المؤقت لو فقد التركيز على التبويب
                draggable                   // يسمح بسحب التوست
                pauseOnHover                // يوقف المؤقت أثناء المرور بالفأرة
                theme="light"               // وضع اللون (light أو dark)
              />
            </>
          </FavouriteProvider>
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
