import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import api from '../service/api';
import { orderStyles } from './Tailwind/Tailwind';

function MyOrders() {
  const [product, setProduct] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/Bookings?userId=${user.id}`);
        setProduct(res.data);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    if (user?.id) fetchProducts();
  }, [user]);

  const calculateOrderTotal = (products) => {
    return products.reduce((total, item) => total + item.price * item.size, 0);
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

        {product.length > 0 ? (
          product.map((order) => (
            <div key={order.id} className={orderStyles.orderCard}>
              {/* Order Metadata Header */}
              <div className={orderStyles.orderHeader}>
                <div>
                  <p className={orderStyles.label}>Order ID</p>
                  <p className={orderStyles.value}>{order.id}</p>
                </div>

                <div>
                  <p className={orderStyles.label}>Payment</p>
                  <p className={orderStyles.value}>{order.payment}</p>
                </div>

                <div>
                  <p className={orderStyles.label}>Status</p>
                  <span className={orderStyles.statusBadge}>
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className={orderStyles.label}>Order Total</p>
                  <p className={orderStyles.totalPrice}>
                    ${calculateOrderTotal(order.product)}
                  </p>
                </div>
              </div>

              {/* Items in this Order */}
              {order.product.map((item, index) => (
                <div key={index} className={orderStyles.productRow}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={orderStyles.productImg}
                  />

                  <div className="flex-1">
                    <h3 className={orderStyles.productName}>{item.name}</h3>
                    <p className={orderStyles.productQty}>
                      Quantity: {item.size}
                    </p>
                  </div>

                  <p className={orderStyles.value}>${item.price * item.size}</p>
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
