import { useState, useEffect } from 'react';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';

function Orders() {
  const { stats } = useStats();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(stats.orders.reverse());
  }, [stats.orders]);

  console.log(orders);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex relative">
      <SideBar />

      <div className="min-h-screen bg-[#0f172a] p-8 text-white flex-1 w-full">
        <h1 className="text-3xl text-center font-bold mb-8">All Orders</h1>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-800 rounded-2xl shadow-lg p-6 hover:scale-[1.01] transition border border-slate-700/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-cyan-400">
                      Order ID:-{order.id}
                    </h2>
                    <h2 className="text-xl font-bold text-white-400">
                      User ID:-{order.userId}
                    </h2>
                    <p className="text-xs text-cyan-500 uppercase tracking-widest">
                      {order.orderDate || 'Recent Order'}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Confirmed
                  </span>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                    Shipping Address
                  </p>

                  <p className="text-sm text-slate-200">
                    {order.address.name}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address.email}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address.number}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address.city}
                  </p>
                  <p className="text-sm text-slate-300">
                    {order.address.address}
                  </p>
                </div>

                <div className="space-y-3 my-3" >
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                      Items
                    </p>
                    {order.product.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm py-1 border-b border-slate-700 last:border-0"
                      >
                        <span className="text-slate-200">{item.name}</span>
                        <span className="text-cyan-400 font-medium">
                          Size: {item.size}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-xs text-slate-400">Total Revenue</p>
                      <p className="text-xl font-bold text-white">
                        {order.product.reduce(
                          (total, item) => total + item.price * item.size,
                          0,
                        )}
                      </p>
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
