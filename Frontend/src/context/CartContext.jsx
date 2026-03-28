import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import api from '../service/api';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, loading } = useUser();

  // ✅ FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) {
          setCart([]);
          return;
        }

        const res = await api.get('/cart');
        setCart(res.data);
      } catch (error) {
        console.error(
          'Cart fetch error',
          error.response?.data || error.message,
        );
        setCart([]);
      }
    };

    if (loading) return;
    fetchCart();
  }, [user, loading]);

  // ✅ ADD PRODUCT
  const addProduct = async (product, qty = 1) => {
    if (!user) {
      toast.error('Please login');
      return;
    }

    try {
      const res = await api.post('/cart', {
        productId: product._id,
        quantity: qty,
      });

      setCart(res.data); // backend returns updated cart
      toast.success('Added to cart');
    } catch (error) {
      console.log(error);
      toast.error('Failed to add');
    }
  };

  // ✅ REMOVE SINGLE ITEM
  const removeCart = async (cartId) => {
    try {
      const res = await api.delete(`/cart/${cartId}`);
      setCart(res.data); // updated cart

      toast.success('Item removed');
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      setCart([]);

      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Error clearing cart');
    }
  };

  // ✅ CART COUNT
  const cartLength = cart.length;

  // ✅ TOTAL PRICE
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }, [cart]);

  // ✅ DELIVERY
  const delivery = useMemo(
    () => (cart.length === 0 ? 0 : totalPrice > 100000 ? 0 : 199),
    [cart.length, totalPrice],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLength,
        totalPrice,
        delivery,
        addProduct,
        removeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
