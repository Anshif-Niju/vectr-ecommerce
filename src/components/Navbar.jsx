import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import vectrLogo from '../assets/img/Vectr.png';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useWishlist } from '../context/WishlistContext';
import { navStyles } from './Tailwind/tailwind';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const { cartLength } = useCart();
  const [open, setOpen] = useState(false);
  const [profileOpen, setprofileOpen] = useState(false);
  const { wishlistLength } = useWishlist();

  const user = JSON.parse(sessionStorage.getItem('user'));

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className={navStyles.header}>
      <nav className={navStyles.nav}>
        <div className={navStyles.mainRow}>
          <div className={navStyles.logoWrapper}>
            <NavLink
              to="/home"
              onClick={scrollTop}
              className={navStyles.logoWrapper}
            >
              <img
                src={vectrLogo}
                alt="VECTR"
                className={navStyles.logoImg}
                loading="lazy"
              />
              <span className={navStyles.logoText}></span>
            </NavLink>
          </div>

          <ul className={navStyles.desktopMenu}>
            {['home', 'shop', 'myorders', 'support'].map((path) => (
              <li key={path} className={navStyles.navItem}>
                <NavLink
                  to={`/${path}`}
                  onClick={path === 'home' ? scrollTop : undefined}
                  className={navStyles.navLink}
                >
                  {path.charAt(0).toUpperCase() +
                    path.slice(1).replace('orders', ' Orders')}
                </NavLink>
                <span className={navStyles.navUnderline}></span>
              </li>
            ))}
          </ul>

          <div className={navStyles.actionWrapper}>
            <div className={navStyles.iconBtnWrapper}>
              <NavLink to="/wishlist" className={navStyles.iconCircle}>
                <FaRegHeart />
                <span className={navStyles.badge}>{wishlistLength}</span>
              </NavLink>
            </div>

            <div className={navStyles.iconBtnWrapper}>
              <NavLink to="/cart">
                <div className={navStyles.iconCircle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <span className={navStyles.badgeCart}>{cartLength}</span>
              </NavLink>
            </div>

            <div className={navStyles.profileArea}>
              <p className={navStyles.userName}>
                {user ? user.name.split(' ')[0] : 'Guest'}
              </p>

              {user?.img ? (
                <img
                  loading="lazy"
                  src={user.img}
                  alt="user"
                  onClick={() => setprofileOpen(!profileOpen)}
                  className={navStyles.userImg}
                />
              ) : (
                <div
                  onClick={() => setprofileOpen(!profileOpen)}
                  className={navStyles.userPlaceholder}
                >
                  {user?.name?.slice(0, 2).toUpperCase() || 'G'}
                </div>
              )}

              {profileOpen && (
                <div className={navStyles.dropdownCard}>
                  <div className={navStyles.dropdownHeader}>
                    <p className={navStyles.dropdownLabel}>Account</p>
                    <p className={navStyles.dropdownName}>{user?.name}</p>
                  </div>
                  <button
                    className={navStyles.logoutBtn}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className={navStyles.mobileToggle}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <div className={navStyles.mobileMenu}>
            <ul className="flex flex-col gap-4 text-center">
              <li>
                <NavLink
                  to="/home"
                  onClick={scrollTop}
                  className={navStyles.mobileLink}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={navStyles.mobileLinkSecondary}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  className={navStyles.mobileLinkSecondary}
                >
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={navStyles.mobileLinkSecondary}
                >
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <style>{`
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}
