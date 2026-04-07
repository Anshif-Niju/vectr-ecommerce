import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import { addToWishlist, getWishlist, removeFromWishlist } from '../service/wishlistService';

const WishlistContext = createContext();

const normalizeWishlistItem = (item) => {
  const product =
    item.product || (item.productId && typeof item.productId === 'object' ? item.productId : null);

  return { ...item, product };
};

const getWishlistProductId = (item) => {
  if (item.product?._id) {
    return item.product._id;
  }

  if (typeof item.productId === 'string') {
    return item.productId;
  }

  return item.productId?._id || null;
};

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

        const items = await getWishlist();
        setWishlist(items.map(normalizeWishlistItem));
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      }
    };

    fetchWishlist();
  }, [user]);

  // ✅ check item
  const isInWishlist = (productId) => {
    return wishlist.some((item) => getWishlistProductId(item) === productId);
  };

  // ✅ toggle wishlist
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    const productId = product._id || product.id;
    const exists = wishlist.find((item) => getWishlistProductId(item) === productId);

    try {
      if (exists) {
        // ❌ remove
        await removeFromWishlist(exists._id);

        setWishlist((prev) => prev.filter((item) => item._id !== exists._id));

        toast.success('Removed from wishlist');
      } else {
        // ✅ add
        const wishlistItem = await addToWishlist(productId);

        setWishlist((prev) => [...prev, normalizeWishlistItem(wishlistItem)]);

        toast.success('Added to wishlist');
      }
    } catch (err) {
      console.error('Error toggling wishlist', err);
    }
  };

  const wishlistLength = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, wishlistLength }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
