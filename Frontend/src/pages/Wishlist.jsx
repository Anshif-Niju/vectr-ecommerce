import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/ShopCards';
import { wishlistStyles } from './Tailwind/Tailwind';

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <>
      <Navbar />

      <div className={wishlistStyles.container}>
        {/* Header */}
        <div className={wishlistStyles.headerWrapper}>
          <span className={wishlistStyles.topBadge}>Saved Items</span>
          <h1 className={wishlistStyles.title}>
            Your <span className={wishlistStyles.accentText}>Wishlist</span>
          </h1>
        </div>

        {/* Wishlist Grid or Empty State */}
        <div className={wishlistStyles.grid}>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <Cards key={item.id} product={item.product} />
            ))
          ) : (
            <div className={wishlistStyles.emptyWrapper}>
              <h1 className={wishlistStyles.emptyTitle}>No Wishlist Items</h1>

              <p className={wishlistStyles.emptyText}>
                You haven’t saved any products yet. Start adding your favorite
                devices!
              </p>

              <Link to="/shop" className={wishlistStyles.browseBtn}>
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;
