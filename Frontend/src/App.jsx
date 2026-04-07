import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Forget from './pages/Forget';
import NotFound from './pages/NotFound';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import CheckOut from './pages/CheckOut';
import MyOrders from './pages/MyOrders';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UserList';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import ScrollTop from './components/ScrollTop';
import { Toaster } from 'react-hot-toast';
import { AdminRoute, GuestRoute, ProtectedRoute } from './routes/RouteGuards';

function AdminSection() {
  return (
    <AdminRoute>
      <Outlet />
    </AdminRoute>
  );
}

function GuestSection() {
  return (
    <GuestRoute>
      <Outlet />
    </GuestRoute>
  );
}

function UserSection() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <>
      <ScrollTop />
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <Routes>
        <Route path="/admin" element={<AdminSection />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route element={<GuestSection />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        <Route element={<UserSection />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/itemDetail/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
