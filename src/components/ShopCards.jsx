import { useState } from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';
import AddCart from './AddCartButton';
import { shopCardStyles } from './Tailwind/tailwind';

function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState('');

  return (
    <div className={shopCardStyles.container}>
      <Link
        to={`/itemDetail/${product.id}`}
        key={product.id}
        className={shopCardStyles.linkWrapper}
      >
        <div className={shopCardStyles.imageContainer}>
          <img
            loading="lazy"
            src={product.img}
            alt={product.name}
            className={shopCardStyles.image}
          />
        </div>

        <div className={shopCardStyles.textSection}>
          <h2 className={shopCardStyles.title}>{product.name}</h2>
          <p className={shopCardStyles.description}>{product.smallDes}</p>
          <p className={shopCardStyles.price}>₹{product.price}</p>
        </div>
      </Link>

      {message && <p className={shopCardStyles.errorMsg}>{message}</p>}

      <div className={shopCardStyles.controlsRow}>
        <button
          onClick={() => {
            if (qty === 1) {
              setMessage('Min Reached');
              return;
            }
            setMessage('');
            setQty((prev) => prev - 1);
          }}
          className={shopCardStyles.qtyBtnMinus}
        >
          -
        </button>

        <span className={shopCardStyles.qtyDisplay}>{qty}</span>

        <button
          onClick={() => {
            if (qty === 10) {
              setMessage('Max limit: 10');
              return;
            }
            setMessage('');
            setQty((prev) => prev + 1);
          }}
          className={shopCardStyles.qtyBtnPlus}
        >
          +
        </button>

        <WishlistButton product={product} />
      </div>

      <div className={shopCardStyles.actionsRow}>
        <AddCart product={product} qty={qty} />
      </div>
    </div>
  );
}

export default ProductCard;
