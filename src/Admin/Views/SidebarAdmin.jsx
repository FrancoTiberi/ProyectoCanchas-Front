import styles from '../../styles/Admin.module.css';
import { Link } from 'react-router-dom';

export default function SidebarAdmin({ onLogout }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Panel Admin</h2>
      <nav>
        <ul>
          <li><Link to="/admin">🏠 Dashboard</Link></li>
          <li><Link to="/admin/comidas">📦 Comidas</Link></li>
          <li><Link to="/admin/reservas">📅 Reservas</Link></li>
          <li>
            <button onClick={onLogout} className={styles.logoutBtn}>
              🔒 Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
