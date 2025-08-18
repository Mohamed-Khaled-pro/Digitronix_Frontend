import { useEffect  } from "react";
import { useUser } from "../context/UserContext"; 
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import ProductCount from "../components/ProductCount";
import UserCount from "../components/UserCount";
import OrderCount from "../components/getOrdersCount";
import CategoryCount from "../components/CategoryCount";
import TotalSales from "../components/TotalSales";
import AddProduct from "../components/AddProduct";
import AdminOrders from "../components/AdminOrders";
export default function Admin() {
 
    const navigate = useNavigate();
    const { user } = useUser();
   

   useEffect(() => {
  if (!user) return; 

  if (user.isAdmin === false) {
    navigate('/error');
    return;
  }

  
}, [user]);

  return (
    <div  className="overflow-hidden mb-20">
   
<motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          Admin Dashboard
        </h1>
        <div className="w-24 h-1 bg-primaryGreen mx-auto mt-3 rounded"></div>
      </motion.div>

        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCount />
          <UserCount />
          <OrderCount />
          <CategoryCount />
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10 p-2">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center">
    <TotalSales />
  </div>
  {/* add product*/ }
  <div >
 <AddProduct />
  </div>
  <div>
    <AdminOrders />
  </div>
  
  </div>
      </motion.div> 
      <div className="flex justify-center">
 
</div>
      
      
      
         </div>
  )
}
