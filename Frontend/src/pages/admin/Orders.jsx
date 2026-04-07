import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useStats } from '../../context/StatsContext';
import SideBar from './SideBar';
import { getOrderStatusClasses, ORDER_STATUS_OPTIONS } from '../../utils/orderStatus';
import { adminOrdersStyles, adminShellStyles } from './Tailwind/AdminTailwind';

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
          ? error.response.data
              .replace(/<[^>]*>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
          : error.response?.data?.message;

      setOrders(previousOrders);
      toast.error(serverMessage || error.message || 'Could not update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className={adminShellStyles.page}>
      <SideBar />

      <div className={adminOrdersStyles.content}>
        <h1 className={adminOrdersStyles.title}>All Orders</h1>

        <div className={adminOrdersStyles.grid}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className={adminOrdersStyles.card}>
                <div className={adminOrdersStyles.header}>
                  <div>
                    <h2 className={adminOrdersStyles.orderId}>Order ID:-{order._id}</h2>
                    <h2 className={adminOrdersStyles.userText}>
                      User:-
                      {order.userId?.username || order.userId?._id || 'Unknown'}
                    </h2>
                    <p className={adminOrdersStyles.dateText}>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : 'Recent Order'}
                    </p>
                  </div>
                  <div className={adminOrdersStyles.badgeColumn}>
                    <span
                      className={`${adminOrdersStyles.badgeBase} ${getOrderStatusClasses(order.status)}`}
                    >
                      {order.status}
                    </span>
                    <span className={adminOrdersStyles.paymentBadge}>{order.paymentMethod}</span>
                  </div>
                </div>

                <div className={adminOrdersStyles.sectionCard}>
                  <p className={adminOrdersStyles.sectionLabel}>Shipping Address</p>

                  <p className={adminOrdersStyles.addressPrimary}>{order.address?.name}</p>
                  <p className={adminOrdersStyles.addressSecondary}>{order.address?.email}</p>
                  <p className={adminOrdersStyles.addressSecondary}>{order.address?.number}</p>
                  <p className={adminOrdersStyles.addressSecondary}>{order.address?.city}</p>
                  <p className={adminOrdersStyles.addressSecondary}>{order.address?.address}</p>
                </div>

                <div className={adminOrdersStyles.sectionStack}>
                  <div className={adminOrdersStyles.sectionCard}>
                    <p className={adminOrdersStyles.sectionLabel}>Items</p>
                    {(order.products || []).map((item, index) => (
                      <div key={index} className={adminOrdersStyles.itemRow}>
                        <span className={adminOrdersStyles.itemName}>{item.productId?.name}</span>
                        <span className={adminOrdersStyles.qtyText}>Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className={adminOrdersStyles.footer}>
                    <div>
                      <p className={adminOrdersStyles.revenueLabel}>Total Revenue</p>
                      <p className={adminOrdersStyles.revenueValue}>Rs.{order.totalPrice}</p>
                    </div>

                    <div className={adminOrdersStyles.selectWrap}>
                      <label className={adminOrdersStyles.selectLabel}>Delivery Status</label>
                      <select
                        value={order.status}
                        disabled={updatingOrderId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={adminOrdersStyles.select}
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
            <div className={adminOrdersStyles.empty}>No orders found in the database.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
