import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { adminSideBarStyles } from './Tailwind/AdminTailwind';

function SideBar({ open: controlledOpen, setOpen: setControlledOpen }) {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = setControlledOpen ?? setInternalOpen;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {open && <div className={adminSideBarStyles.overlay} onClick={() => setOpen(false)}></div>}

      <aside className={adminSideBarStyles.aside(open)}>
        <div className={adminSideBarStyles.header}>
          <h1 className={adminSideBarStyles.title}>Admin Panel</h1>

          <button onClick={() => setOpen(false)} className={adminSideBarStyles.closeButton}>
            ✕
          </button>
        </div>

        <nav className={adminSideBarStyles.nav}>
          <Link to="/admin/dashboard" className={adminSideBarStyles.navLink}>
            Dashboard
          </Link>
          <Link to="/admin/userlist" className={adminSideBarStyles.navLink}>
            Users
          </Link>
          <Link to="/admin/orders" className={adminSideBarStyles.navLink}>
            Orders
          </Link>
          <Link to="/admin/products" className={adminSideBarStyles.navLink}>
            Products
          </Link>
        </nav>

        <div className={adminSideBarStyles.footer}>
          <button onClick={handleLogout} className={adminSideBarStyles.logoutButton}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
