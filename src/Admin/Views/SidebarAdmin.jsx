import styles from '../../styles/Admin.module.css';
import { Link } from 'react-router-dom';

export default function SidebarAdmin({ onLogout, onVolverInicio }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Panel Admin</h2>
      <nav>
        <ul>
          <li><Link to="/admin"><i className="bi bi-speedometer2"></i> Dashboard</Link></li>
          <li><Link to="/admin/comidas"><i className="bi bi-basket"></i> Comidas</Link></li>
          <li><Link to="/admin/canchas"><i className="bi bi-tags"></i> Canchas</Link></li>
          <li><Link to="/admin/reservas"><i className="bi bi-calendar-check"></i> Reservas</Link></li>
          <li><Link to="/admin/productos"><i className="bi bi-shop"></i> Productos</Link></li>
          <li>
            <button onClick={onVolverInicio} className={styles.btnVolver}>
              <i className="bi bi-house-door"></i> Volver al inicio
            </button>
          </li>
          <li>
            <button onClick={onLogout} className={styles.logoutBtn}>
              <i className="bi bi-box-arrow-right"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
