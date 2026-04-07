import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { orderStyles } from './Tailwind/Tailwind';
import { getOrderStatusClasses } from '../utils/orderStatus';
import { getMyOrders as fetchMyOrders } from '../service/orderService';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    let intervalId;

    const fetchOrders = async () => {
      try {
        const userOrders = await fetchMyOrders();
        setOrders(userOrders);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
      intervalId = setInterval(fetchOrders, 15000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user]);

  const calculateOrderTotal = (products) => {
    return products.reduce((total, item) => {
      return total + (item.productId?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className={orderStyles.container}>
        <div className={orderStyles.headerWrapper}>
          <p className={orderStyles.badge}>ORDER HISTORY</p>
          <h1 className={orderStyles.title}>My Orders</h1>
          <div className={orderStyles.underline}></div>
        </div>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id || order.id} className={orderStyles.orderCard}>
              {/* Order Metadata Header */}
              <div className={orderStyles.orderHeader}>
                <div>
                  <p className={orderStyles.label}>Order ID</p>
                  <p className={orderStyles.value}>{order._id || order.id}</p>
                </div>

                <div>
                  <p className={orderStyles.label}>Payment</p>
                  <p className={orderStyles.value}>{order.paymentMethod}</p>
                </div>

                <div>
                  <p className={orderStyles.label}>Status</p>
                  <span
                    className={`${orderStyles.statusBadge} ${getOrderStatusClasses(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className={orderStyles.label}>Order Total</p>
                  <p className={orderStyles.totalPrice}>
                    ${order.totalPrice ?? calculateOrderTotal(order.products || [])}
                  </p>
                </div>
              </div>

              {/* Items in this Order */}
              {(order.products || []).map((item, index) => (
                <div key={index} className={orderStyles.productRow}>
                  <img
                    src={item.productId?.img}
                    alt={item.productId?.name}
                    className={orderStyles.productImg}
                  />

                  <div className="flex-1">
                    <h3 className={orderStyles.productName}>{item.productId?.name}</h3>
                    <p className={orderStyles.productQty}>Quantity: {item.quantity}</p>
                  </div>

                  <p className={orderStyles.value}>
                    ${(item.productId?.price || 0) * (item.quantity || 0)}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className={orderStyles.emptyState}>
            <h1 className={orderStyles.title}>No Orders Found</h1>
            <p className="text-gray-500 text-lg mt-2 max-w-xl">
              You haven't purchased any items yet. Your next upgrade is waiting!
            </p>
            <Link to="/shop" className={orderStyles.browseBtn}>
              Browse Products
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyOrders;
