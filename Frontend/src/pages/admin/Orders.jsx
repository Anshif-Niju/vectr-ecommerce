import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import {
  getOrderStatusClasses,
  ORDER_STATUS_OPTIONS,
} from '../../utils/orderStatus';

function Orders() {
  const { stats, updateOrderStatus } = useStats();
  const [orders, setOrders] = useState([...stats.orders]);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    setOrders([...stats.orders]);
  }, [stats.orders]);

  const handleStatusChange = async (orderId, nextStatus) => {
    const previousOrders = [...orders];

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order._id === orderId ? { ...order, status: nextStatus } : order,
      ),
    );
    setUpdatingOrderId(orderId);

    try {
      await updateOrderStatus(orderId, nextStatus);
      toast.success('Order status updated');
    } catch (error) {
      const serverMessage =
        typeof error.response?.data === 'string'
          ? error.response.data.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
          : error.response?.data?.message;

      setOrders(previousOrders);
      toast.error(serverMessage || error.message || 'Could not update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
      <SideBar />

      <div className="min-h-screen bg-[#0f172a] p-8 text-white flex-1 w-full">
        <h1 className="text-3xl text-center font-bold mb-8">All Orders</h1>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-slate-800 rounded-2xl shadow-lg p-6 hover:scale-[1.01] transition border border-slate-700/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-cyan-400">
                      Order ID:-{order._id}
                    </h2>
                    <h2 className="text-xl font-bold text-white-400">
                      User:-
                      {order.userId?.username || order.userId?._id || 'Unknown'}
                    </h2>
                    <p className="text-xs text-cyan-500 uppercase tracking-widest">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : 'Recent Order'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusClasses(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                    Shipping Address
                  </p>

                  <p className="text-sm text-slate-200">
                    {order.address?.name}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address?.email}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address?.number}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address?.city}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address?.address}
                  </p>
                </div>

                <div className="space-y-3 my-3">
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                      Items
                    </p>
                    {(order.products || []).map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm py-1 border-b border-slate-700 last:border-0"
                      >
                        <span className="text-slate-200">
                          {item.productId?.name}
                        </span>
                        <span className="text-cyan-400 font-medium">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-xs text-slate-400">Total Revenue</p>
                      <p className="text-xl font-bold text-white">
                        Rs.{order.totalPrice}
                      </p>
                    </div>

                    <div className="min-w-[220px]">
                      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">
                        Delivery Status
                      </label>
                      <select
                        value={order.status}
                        disabled={updatingOrderId === order._id}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-cyan-400"
                      >
                        {ORDER_STATUS_OPTIONS.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500">
              No orders found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
