import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/orders/${id}`, { withCredentials: true })
      .then((res) => setOrder(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load order");
      });
  }, [id]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    axiosClient
      .put(
        `/orders/${id}/state`,
        { state: newState },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order status updated");
        setOrder(res.data.order);
      })
      .catch(() => toast.error("Failed to update status"));
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    axiosClient
      .delete(`/orders/admin/${id}`, { withCredentials: true })
      .then(() => {
        toast.success("Order removed");
        navigate("/admin-dashboard");
      })
      .catch(() => toast.error("Failed to delete order"));
  };

  if (!order)
    return <div className="mt-28 text-center text-lg">Loading...</div>;

  return (
    <div className="mt-28 p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-4 space-y-3">
        <p>
          <strong>User:</strong> {order.user?.name}
        </p>
        <p>
          <strong>Email:</strong> {order.user?.email}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <select
  value={order.state}
  onChange={handleStateChange}
  className="border dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white rounded px-2 py-1"
>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </p>
        <p>
          <strong>Total:</strong> ${order.totalPrice?.toFixed(2)}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>

        <h3 className="font-bold mt-4">Items:</h3>
        <ul className="list-disc pl-6">
          {order.orderItems?.map((item, index) => (
            <li key={index}>
              {item.product?.name} × {item.quantity}
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Remove Order
          </button>
        </div>
      </div>
    </div>
  );
}
