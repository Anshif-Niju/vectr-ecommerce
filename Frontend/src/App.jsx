import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ScrollTop from './components/ScrollTop';
import { Toaster } from 'react-hot-toast';
import { AdminRoute, GuestRoute, ProtectedRoute, RouteLoading } from './routes/RouteGuards';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Forget = lazy(() => import('./pages/Forget'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const CheckOut = lazy(() => import('./pages/CheckOut'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserList = lazy(() => import('./pages/admin/UserList'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Products = lazy(() => import('./pages/admin/Products'));

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

      <Suspense fallback={<RouteLoading />}>
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
      </Suspense>
    </>
  );
}

export default App;
