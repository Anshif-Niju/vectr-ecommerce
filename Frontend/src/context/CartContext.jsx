import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import api from '../service/api';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) {
          setCart([]);
          return;
        }

        const res = await api.get(`/Cart?userId=${user.id}`);
        setCart(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [user]);

  const addProduct = async (product, qty) => {
    if (!user) {
      toast.success('please Login');
    }
    try {
      const res = await api.get(
        `/Cart?userId=${user.id}&product.id=${product.id}`,
      );
      if (res.data.length > 0) {
        const cartItem = res.data[0];
        const newSize = cartItem.size + qty;

        await api.patch(`/Cart/${cartItem.id}`, {
          size: newSize,
        });

        toast.success('Product size Updated');

        setCart((prev) =>
          prev.map((item) =>
            item.id == cartItem.id ? { ...item, size: newSize } : item,
          ),
        );
      } else {
        const response = await api.post('/Cart', {
          userId: user.id,
          product: product,
          size: qty || 1,
        });

        toast.success('Product added');
        setCart((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      const deletePromises = cart.map((item) => api.delete(`/Cart/${item.id}`));
      await Promise.all(deletePromises);

      setCart([]);
    } catch (error) {
      toast.error('Error clearing cart');
    }
  };

  const removeCart = async (cartId) => {
    try {
      await api.delete(`/Cart/${cartId}`);
      setCart((prev) => prev.filter((item) => cartId !== item.id));
    } catch (error) {
      console.log(error);
    }
  };

  const cartLength = cart.length;

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.size;
    }, 0);
  }, [cart]);

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
        setCart,
        removeCart,
        addProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
