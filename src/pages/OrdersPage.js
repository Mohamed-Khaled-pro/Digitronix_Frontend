import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosClient.get(`/orders/get/user/${user._id}`);
           const sortedOrders = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleCancel = (id, state) => {
    if (state === "pending" || state === "shipped" ) {
      axiosClient
        .delete(`/orders/${id}`)
        .then((res) => {
          toast.success("Order cancelled successfully");

          setOrders(
            orders.map((order) =>
              order._id === id ? { ...order, state: "cancelled" } : order
            )
          );
        })
        .catch((err) => {
  console.error("Cancel order error:", err.response || err);
  toast.error("Error cancelling order");
});
    } else {
      toast.error("Order cannot be cancelled because it is delivered");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100 mb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
          My Orders
        </h1>
        <div className="w-24 h-1 bg-primaryGreen mx-auto mt-3 rounded"></div>
      </motion.div>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No orders found.
        </p>
      ) : (
        <div className="space-y-6 mb-20">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-white dark:bg-primaryDark shadow-md"
            >
              {/* Order Status */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 m-4 text-sm font-semibold rounded-full text-white ${statusColor(
                    order.state
                  )}`}
                >
                  {order.state.toUpperCase()}
                </span>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Items */}
              <div className="relative mb-10">
                <p className="font-semibold mb-2">Items:</p>
                <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                  {order.orderItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between py-1 text-sm"
                    >
                      <h2 className=" text-xl">
                        {item.product?.name}{" "}
                        <span className="text-primaryGreen ms-1 text-xl">
                          ×{item.quantity}
                        </span>
                      </h2>
                      <span className="  font-medium text-sm md:text-lg text-nowrap">
                        {item.product?.price} EGP
                      </span>
                    </li>
                  ))}
                </ul>
                <div></div>
                <div className="flex justify-center items-center gap-5 mt-10">
                  <h1 className="text-2xl"> Total : {order.totalPrice} EGP</h1>
                  {order.state !== "cancelled" &&   order.state !== "delivered" &&(
                    <button
                      onClick={() => handleCancel(order._id, order.state)}
                      className="text-white bg-red-500 border-2 border-transparent hover:border-red-500 hover:bg-transparent hover:text-red-500 text-sm px-4 py-2 rounded-md transition-all duration-1500 box-border"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
