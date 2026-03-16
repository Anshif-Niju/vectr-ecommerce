import { useState } from 'react'; // Added useState
import { useNavigate } from 'react-router-dom';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const { stats } = useStats();
  const [open, setOpen] = useState(false);

  const recentOrders = stats.orders.slice(-3).reverse();

  const totalPrice = (product) => {
    return product.reduce((total, item) => total + item.price, 0);
  };

  const graphData = stats.orders.slice(-5).map((order) => ({
    name: order.orderDate.split(',')[0],
    revenue: totalPrice(order.product),
  }));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
      <SideBar open={open} setOpen={setOpen} />

      <main className="flex-1 p-6 md:p-8 w-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white text-3xl hover:text-cyan-400 transition"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>
            <h2 className="text-3xl font-semibold text-white">
              Dashboard Overview
            </h2>
          </div>
        </div>

        {/* Stats Cards */}
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
              ₹{stats.totalRevenue}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow border border-slate-700">
            <h3 className="text-sm text-slate-400">Products</h3>
            <p className="text-3xl font-bold mt-2 text-white">
              {stats.totalProducts}
            </p>
          </div>
        </div>

        {/* --- GRAPH SECTION --- */}
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
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
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

        {/* Recent Orders Table */}
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
                  key={item.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                >
                  <td className="py-3 font-mono text-cyan-400">{item.id}</td>
                  <td>{item.address.name}</td>
                  <td>
                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs">
                      {item.status}
                    </span>
                  </td>
                  <td>{item.orderDate}</td>
                  <td className="capitalize">{item.payment}</td>
                  <td className="font-bold">₹{totalPrice(item.product)}</td>
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
