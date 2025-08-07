import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TotalSales() {
  const [sales, setSales] = useState(0);

  useEffect(() => {
    axiosClient.get("/orders/get/totalsales").then((res) => {
      setSales(res.data.totalSales);
    });
  }, []);

  const data = [
    {
      name: "Total Sales",
      value: sales,
    },
  ];

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-white">Total Sales</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="value" fill="#16a34a" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
