import '../styles/general.css';
import styles from '../styles/Header.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal.jsx';
import { useAuth } from '../context/AuthProvider.jsx';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.headerWrapper}>
      <Container fluid className={styles.navContenedor}>
        <Nav className={styles.headerNav}>
          <Link to='/' className={styles.navLinks}>Inicio</Link>
          <Link to='/reservas' className={styles.navLinks}>Reserva-F5</Link>
          <Link to='/menu' className={styles.navLinks}>Menú</Link>
          <Link to='/contacto' className={styles.navLinks}>Contacto</Link>
          <Link to='/sobrenosotros' className={styles.navLinks}>Sobre Nosotros</Link>

          <form className={`d-flex ${styles.formBuscador} ms-3`} role="search">
            <input
              aria-label="Buscar"
              className={`form-control me-2 ${styles.buscador}`}
              placeholder="Buscar"
              type="search"
            />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </Nav>

        <div className={styles.loginBtns}>
          {user?.name ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className={styles.userAvatarContainer}
                title={user.role === 'admin' ? 'Administrador' : 'Usuario'}
              >
                {user.role === 'admin' ? (
                  <Link to="/admin"><i className="bi-award-fill fs-4"></i></Link>
                ) : (
                  <i className="bi bi-person-fill fs-4"></i>
                )}
              </div>
              <span
                className={`${styles.userName} ${user.role === 'admin' ? styles.adminName : styles.userNameCommon}`}
              >
                {user.name || 'Sin nombre'}
              </span>
              <button onClick={logout} className={`btn ${styles.btnSalir}`}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <LoginModal className={styles.btnLogin} />
              <Link to="/construccion" className={`btn ${styles.btnLogin}`}>
                Registrar
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
