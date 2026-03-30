import { useState } from 'react';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import { getOrderStatusClasses } from '../../utils/orderStatus';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function Dashboard() {
  const { stats } = useStats();
  const [open, setOpen] = useState(false);

  const recentOrders = [...stats.orders].slice(-3);

  const totalPrice = (products = []) => {
    return products.reduce((total, item) => {
      return total + (item.productId?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const graphData = stats.orders.slice(-5).map((order, index) => ({
    revenue: order.totalPrice ?? totalPrice(order.products),
  }));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
      <SideBar open={open} setOpen={setOpen} />

      <main className="flex-1 p-6 md:p-8 w-full overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white text-3xl hover:text-cyan-400 transition"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
            <h2 className="text-3xl font-semibold text-white">
              Dashboard Overview
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-800 p-6 rounded-xl shadow border border-slate-700">
            <h3 className="text-sm text-slate-400">Total Users</h3>
            <p className="text-3xl font-bold mt-2 text-white">
              {stats.totalUsers}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow border border-slate-700">
            <h3 className="text-sm text-slate-400">Orders</h3>
            <p className="text-3xl font-bold mt-2 text-white">
              {stats.totalOrders}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow border border-slate-700">
            <h3 className="text-sm text-slate-400">Revenue</h3>
            <p className="text-3xl font-bold mt-2 text-green-400">
              Rs.{stats.totalRevenue}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow border border-slate-700">
            <h3 className="text-sm text-slate-400">Products</h3>
            <p className="text-3xl font-bold mt-2 text-white">
              {stats.totalProducts}
            </p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow mb-10 border border-slate-700">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Revenue Analytics
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `Rs.${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl shadow p-6 overflow-x-auto border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Recent Orders
          </h3>
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="py-3">Order ID</th>
                <th>User</th>
                <th>Status</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((item) => (
                <tr
                  key={item._id || item.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                >
                  <td className="py-3 font-mono text-cyan-400">
                    {item._id || item.id}
                  </td>
                  <td>{item.userId?.username || item.address?.name}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getOrderStatusClasses(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.orderDate
                      ? new Date(item.orderDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="capitalize">{item.paymentMethod}</td>
                  <td className="font-bold">
                    Rs.{item.totalPrice ?? totalPrice(item.products)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
