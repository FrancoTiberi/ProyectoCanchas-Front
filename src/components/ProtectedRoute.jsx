import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
