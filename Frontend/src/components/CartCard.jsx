import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { cartCardStyles } from './Tailwind/tailwind';

function CartCard({ id, item, size }) {
  const [msg, setMsg] = useState('');
  const { removeCart, addProduct } = useCart();

  function removeCartButton() {
    removeCart(id);
  }

  function changeProductSize(amount) {
    if (amount == -1 && size <= 1) {
      setMsg('Minimum Reached');
      return;
    }

    setMsg('');
    addProduct(item, amount);
  }

  return (
    <div className={cartCardStyles.wrapper}>
      <div className={cartCardStyles.cardContainer}>
        <img
          src={item.img}
          className={cartCardStyles.image}
          loading="lazy"
          alt={item.name}
        />

        <div className={cartCardStyles.contentArea}>
          <h2 className={cartCardStyles.title}>{item.name}</h2>
          <p className={cartCardStyles.description}>{item.smallDes}</p>

          <div className={cartCardStyles.actionRow}>
            <span className={cartCardStyles.priceText}>{item.price}</span>

            <div className={cartCardStyles.qtyControl}>
              <button
                className={cartCardStyles.qtyBtn}
                onClick={() => changeProductSize(-1)}
              >
                -
              </button>

              <span className={cartCardStyles.qtyValue}>{size}</span>

              <button
                className={cartCardStyles.qtyBtn}
                onClick={() => changeProductSize(1)}
              >
                +
              </button>

              {msg && <p className={cartCardStyles.errorMsg}>{msg}</p>}
            </div>
          </div>
        </div>

        <button onClick={removeCartButton} className={cartCardStyles.removeBtn}>
          ✕
        </button>
      </div>

      <div className={cartCardStyles.divider}></div>
    </div>
  );
}

export default CartCard;
