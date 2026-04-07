import { useState } from 'react';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import { getOrderStatusClasses } from '../../utils/orderStatus';
import { adminDashboardStyles, adminShellStyles } from './Tailwind/AdminTailwind';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

function Dashboard() {
  const { stats } = useStats();
  const [open, setOpen] = useState(false);

  const recentOrders = [...stats.orders].slice(-3);

  const totalPrice = (products = []) => {
    return products.reduce((total, item) => {
      return total + (item.productId?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const graphData = stats.orders
    .slice(-5)
    .map((order) => ({ revenue: order.totalPrice ?? totalPrice(order.products) }));

  return (
    <div className={adminShellStyles.page}>
      <SideBar open={open} setOpen={setOpen} />

      <main className={adminShellStyles.main}>
        <div className={adminDashboardStyles.header}>
          <div className={adminDashboardStyles.headerLeft}>
            <button className={adminDashboardStyles.menuButton} onClick={() => setOpen(true)}>
              Menu
            </button>
            <h2 className={adminDashboardStyles.title}>Dashboard Overview</h2>
          </div>
        </div>

        <div className={adminDashboardStyles.statsGrid}>
          <div className={adminDashboardStyles.statCard}>
            <h3 className={adminDashboardStyles.statLabel}>Total Users</h3>
            <p className={adminDashboardStyles.statValue}>{stats.totalUsers}</p>
          </div>
          <div className={adminDashboardStyles.statCard}>
            <h3 className={adminDashboardStyles.statLabel}>Orders</h3>
            <p className={adminDashboardStyles.statValue}>{stats.totalOrders}</p>
          </div>
          <div className={adminDashboardStyles.statCard}>
            <h3 className={adminDashboardStyles.statLabel}>Revenue</h3>
            <p className={adminDashboardStyles.statValueRevenue}>Rs.{stats.totalRevenue}</p>
          </div>
          <div className={adminDashboardStyles.statCard}>
            <h3 className={adminDashboardStyles.statLabel}>Products</h3>
            <p className={adminDashboardStyles.statValue}>{stats.totalProducts}</p>
          </div>
        </div>

        <div className={adminDashboardStyles.chartCard}>
          <h3 className={adminDashboardStyles.chartTitle}>Revenue Analytics</h3>
          <div className={adminDashboardStyles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `Rs.${value}`}
                />
                <Tooltip
                  contentStyle={adminDashboardStyles.tooltipContent}
                  itemStyle={adminDashboardStyles.tooltipItem}
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

        <div className={adminDashboardStyles.tableWrapper}>
          <h3 className={adminShellStyles.sectionTitle}>Recent Orders</h3>
          <table className={adminDashboardStyles.table}>
            <thead>
              <tr className={adminDashboardStyles.tableHeadRow}>
                <th className={adminDashboardStyles.tableHeadCell}>Order ID</th>
                <th>User</th>
                <th>Status</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((item) => (
                <tr key={item._id || item.id} className={adminDashboardStyles.tableRow}>
                  <td className={adminDashboardStyles.orderIdCell}>{item._id || item.id}</td>
                  <td>{item.userId?.username || item.address?.name}</td>
                  <td>
                    <span
                      className={`${adminDashboardStyles.statusBadgeBase} ${getOrderStatusClasses(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.orderDate ? new Date(item.orderDate).toLocaleDateString() : 'N/A'}</td>
                  <td className={adminDashboardStyles.paymentCell}>{item.paymentMethod}</td>
                  <td className={adminDashboardStyles.amountCell}>
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
