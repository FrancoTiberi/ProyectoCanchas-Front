import '../styles/general.css';
import styles from '../styles/Header.module.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <Container fluid className={styles.navContenedor}>
        <Nav className={styles.headerNav}>
          <Link to='/' className={styles.navLinks}>
            Inicio
          </Link>
          <Link to='' className={styles.navLinks}>
            Reserva-F5
          </Link>
          <Link to='menu' className={styles.navLinks}>
            Menú
          </Link>
          <Link to='' className={styles.navLinks}>
            Contacto
          </Link>
          <Link to='' className={styles.navLinks}>
            Sobre Nosotros
          </Link>

          <form className={`d-flex ${styles.formBuscador} ms-3`} role="search">
            <input
              aria-label="Buscar"
              className={`form-control me-2 ${styles.buscador}`}
              placeholder="Buscar"
              type="search"
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </Nav>

        <div className={styles.loginBtns}>
          <Link to='' className="btn btn-primary">
            Iniciar Sesión
          </Link>
          <Link to='' className="btn btn-primary">
            Registrar
          </Link>
        </div>
      </Container>
    </header>
  );
};
