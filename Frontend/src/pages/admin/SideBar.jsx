import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function SideBar() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 p-6 
          flex flex-col 
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:sticky md:top-0 md:h-screen
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-4 flex-1">
          <Link to="/admin/dashboard" className="block hover:text-cyan-400">
            Dashboard
          </Link>
          <Link to="/admin/userlist" className="block hover:text-cyan-400">
            Users
          </Link>
          <Link to="/admin/orders" className="block hover:text-cyan-400">
            Orders
          </Link>
          <Link to="/admin/products" className="block hover:text-cyan-400">
            Products
          </Link>
        </nav>

        <div className="mt-auto pt-8">
          <button
            onClick={handleLogout}
            className="bg-cyan-500 w-full hover:bg-cyan-600 px-4 py-2 rounded-lg text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
