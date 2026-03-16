import { useCart } from '../context/CartContext';
import { cartBtnStyles } from './Tailwind/tailwind';

function AddCart({ product, qty }) {
  const { addProduct } = useCart();

  const addProductCart = () => {
    addProduct(product, qty);
  };

  return (
    <button onClick={addProductCart} className={cartBtnStyles.button}>
      Add to Cart
    </button>
  );
}

export default AddCart;
