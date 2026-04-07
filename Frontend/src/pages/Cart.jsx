import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { cartStyles } from './Tailwind/Tailwind';

function Cart() {
  const { cart, totalPrice, delivery } = useCart();

  return (
    <>
      <Navbar />
      <div className={cartStyles.container}>
        <div className={cartStyles.backgroundBlur}></div>

        <h1 className={cartStyles.title}>
          Your <span className={cartStyles.titleHighlight}>Cart</span>
        </h1>

        <div className={cartStyles.gridWrapper}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartCard
                key={item._id || item.id}
                id={item._id || item.id}
                item={item.product}
                quantity={item.quantity}
              />
            ))
          ) : (
            <div className={cartStyles.emptyWrapper}>
              <h1 className={cartStyles.emptyTitle}>No Cart Items</h1>
              <p className={cartStyles.emptyText}>
                You haven’t added any products yet. Start adding your devices!
              </p>
              <Link to="/shop" className={cartStyles.browseBtn}>
                Browse Products
              </Link>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className={cartStyles.summaryWrapper}>
            <div className={cartStyles.summaryCard}>
              <h2 className={cartStyles.summaryTitle}>Order Summary</h2>

              <div className={cartStyles.summaryRow}>
                <span>Subtotal</span>
                <span className={cartStyles.summaryValue}>{totalPrice}</span>
              </div>

              <div className={cartStyles.summaryRow}>
                <span>Delivery</span>
                <span className={cartStyles.summaryValue}>{delivery}</span>
              </div>

              <div className={cartStyles.totalRow}>
                <span>Total</span>
                <span className={cartStyles.totalValue}>{totalPrice + delivery}</span>
              </div>

              <Link to="/checkOut" className={cartStyles.checkoutBtn}>
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
