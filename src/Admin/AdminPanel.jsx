import { useAuth } from '../context/AuthProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import SidebarAdmin from './Views/SidebarAdmin';
import styles from '../styles/Admin.module.css';

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  const handleVolverInicio = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <SidebarAdmin
        onLogout={handleCerrarSesion}
        onVolverInicio={handleVolverInicio}
      />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Bienvenido de nuevo, {user?.nombre || 'Invitado'}</h1>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
