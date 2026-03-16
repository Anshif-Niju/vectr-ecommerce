import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';
import { useUser } from '../context/UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.id) {
        setWishlist([]);
        return;
      }
      try {
        const res = await api.get(`/wishlist?userId=${user.id}`);
        setWishlist(res.data);
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      }
    };
    fetchWishlist();
  }, [user?.id]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      alert('Please Login to manage your wishlist');
      return;
    }

    const exists = wishlist.find((item) => item.productId === product.id);

    try {
      if (exists) {
        await api.delete(`/wishlist/${exists.id}`);
        setWishlist((prev) => prev.filter((item) => item.id !== exists.id));
      } else {
        const payload = {
          userId: user.id,
          productId: product.id,
          product: product,
        };
        const res = await api.post('/wishlist', payload);
        setWishlist((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error('Error toggling wishlist', err);
    }
  };

  const wishlistLength = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist, wishlistLength }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
