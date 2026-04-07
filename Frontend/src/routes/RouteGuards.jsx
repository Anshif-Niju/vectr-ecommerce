import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1FAEE] text-[#1D3557]">
      <div className="text-lg font-bold">Loading...</div>
    </div>
  );
}

export function AdminRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) return <RouteLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/home" replace />;

  return children;
}

export function GuestRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) return <RouteLoading />;
  if (!user) return children;

  return user.role === 'admin' ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/home" replace />
  );
}

export function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) return <RouteLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;

  return children;
}
