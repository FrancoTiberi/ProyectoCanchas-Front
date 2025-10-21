import '../styles/general.css'
import '../styles/Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
      <Container fluid className="nav-contenedor">
        <Nav className="header-nav">
          <Link to='/' className="nav-links">
            Inicio
          </Link>
          <Link to='' className="nav-links" >
            Reserva-F5
          </Link>
          <Link to='menu' className="nav-links" >
            Menú
          </Link>
          <Link to='' className="nav-links">
            Contacto
          </Link>
          <Link to='' className="nav-links">
            Sobre Nosotros
          </Link>
          <form className="d-flex form-buscador ms-3" role="search">
            <input
              aria-label="Buscar"
              className="form-control me-2 buscador"
              placeholder="Buscar"
              type="search"
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </Nav>

        <div className="login-btns">
          <Link to='' className="btn btn-primary btn-login" >
            Iniciar Sesión
          </Link>
          <Link to='' className="btn btn-primary btn-login">
            Registrar
          </Link>
        </div>
      </Container>
    </header>
  );
}
