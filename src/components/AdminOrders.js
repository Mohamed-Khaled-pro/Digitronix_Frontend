import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosClient.get("/orders", { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load orders");
      });
  }, []);

  return (
    <div className="mt-28 p-4">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="p-3 whitespace-nowrap">#</th>
              <th className="p-3 whitespace-nowrap">User</th>
              <th className="p-3 whitespace-nowrap hidden md:table-cell">Total</th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap hidden sm:table-cell">Date</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
                <tr  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{order.user?.name || "Unknown"}</td>
                <td className="p-3 hidden md:table-cell">${order.totalPrice?.toFixed(2)}</td>
                <td className="p-3">{order.state}</td>
                <td className="p-3 hidden sm:table-cell">
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-3">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="text-black font-bold bg-primaryGreen p-2 hover:underline"
                    >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
