import { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useUser();

  // ✅ fetch wishlist (no userId needed)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!user) {
          setWishlist([]);
          return;
        }

        const res = await api.get('/wishlist');
        setWishlist(res.data);

      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      }
    };

    fetchWishlist();
  }, [user]);

  // ✅ check item
  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.productId === productId || item.product?._id === productId
    );
  };

  // ✅ toggle wishlist
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    const exists = wishlist.find(
      (item) => item.productId === product._id
    );

    try {
      if (exists) {
        // ❌ remove
        await api.delete(`/wishlist/${exists._id}`);

        setWishlist((prev) =>
          prev.filter((item) => item._id !== exists._id)
        );

        toast.success('Removed from wishlist');

      } else {
        // ✅ add
        const res = await api.post('/wishlist', {
          productId: product._id,
        });

        setWishlist((prev) => [...prev, res.data]);

        toast.success('Added to wishlist');
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