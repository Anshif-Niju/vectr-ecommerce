import { useCart } from '../context/CartContext';
import { checkoutStyles } from './Tailwind/tailwind';

function CheckoutCard() {
  const { cart, removeCart } = useCart();

  return (
    <>
      {cart ? (
        cart.map((item) => {
          return (
            <div key={item._id || item.id} className={checkoutStyles.wrapper}>
              <div className={checkoutStyles.cardContainer}>
                <img
                  src={item.product.img}
                  className={checkoutStyles.image}
                  loading="lazy"
                  alt={item.product.name}
                />

                <div className={checkoutStyles.contentArea}>
                  <h2 className={checkoutStyles.title}>{item.product.name}</h2>
                  <p className={checkoutStyles.description}>{item.product.smallDes}</p>

                  <div className={checkoutStyles.detailsRow}>
                    <span className={checkoutStyles.priceText}>{item.product.price}</span>

                    <span className={checkoutStyles.qtyText}>Quantity: {item.quantity}</span>
                    <span className={checkoutStyles.totalText}>
                      Total: {item.product.price * item.quantity}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    removeCart(item._id || item.id);
                  }}
                  className={checkoutStyles.removeBtn}
                >
                  ✕
                </button>
              </div>

              <div className={checkoutStyles.divider}></div>
            </div>
          );
        })
      ) : (
        <p className={checkoutStyles.emptyMsg}>Your cart is empty.</p>
      )}
    </>
  );
}

export default CheckoutCard;
