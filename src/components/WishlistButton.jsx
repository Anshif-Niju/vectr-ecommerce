import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { wishlistBtnStyles } from './Tailwind/tailwind';

function WishlistButton({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <button
      onClick={handleToggle}
      className={wishlistBtnStyles.button}
      aria-label="Toggle Wishlist"
    >
      <Heart size={22} className={wishlistBtnStyles.icon(isLiked)} />
    </button>
  );
}

export default WishlistButton;
