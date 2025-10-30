import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SidebarAdmin from './Views/SidebarAdmin';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Admin.module.css';
import { useAuth } from '../context/AuthProvider';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      setCargando(false);
    }
  }, [user]);

  const handleCerrarSesion = () => {
    logout();
    navigate('/');
  };

  const handleVolverInicio = () => {
    navigate('/');
  };

  if (cargando) return null;

  return (
    <div className={styles.container}>
      <SidebarAdmin onLogout={handleCerrarSesion} />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Bienvenido de nuevo, {user.name}</h1>
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
