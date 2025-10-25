import '../styles/general.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

export const Header = () => {
  return (
    <header>
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
          <form className="d-flex" role="search">
            <input
              aria-label="Buscar"
              className={styles.formControl}
              placeholder="Buscar"
              type="search"
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </Nav>

        <div className={styles.loginBtns}>
          <Link to='' className={styles.btnLogin}>
            Iniciar Sesión
          </Link>
          <Link to='' className={styles.btnLogin}>
            Registrar
          </Link>
        </div>
      </Container>
    </header>
  );
}
