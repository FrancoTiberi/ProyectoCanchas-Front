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
      <SidebarAdmin onLogout={handleCerrarSesion} />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Bienvenido de nuevo, {user?.name || 'Invitado'}</h1>
          <div className={styles.headerButtons}>
            <button onClick={handleVolverInicio} className={styles.btnVolver}>
              Volver al inicio
            </button>
          </div>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
