import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Si no hay usuario, redirige
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Normaliza el rol a mayúsculas
  const userRole = user.rol?.toUpperCase();

  if (!allowedRoles.map(r => r.toUpperCase()).includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
