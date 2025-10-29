import styles from '../styles/headerInicio.module.css'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

export default function HeaderInicio() {
  return (
    <div className={styles.contenedorPrincipal}>
        <section className={styles.navContenedor}>
            <nav className={styles.headerNav}>
                <img src={logo} height="50px" alt="logo" className={styles.logo}/>
                <Link to="/" className={styles.navLinks}>Inicio</Link>
                <Link to="./reservas" className={styles.navLinks}>Reserva-F5</Link>
                <Link to="./menu" className={styles.navLinks}>Comida</Link>
                <Link to="./construccion"className={styles.navLinks}>Contacto</Link>
                <Link to="./construccion" className={styles.navLinks}>Sobre Nosotros</Link>
                <form className="d-flex form-buscador" role="search">
                    <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </nav>
        </section>
        <section className={styles.tituloContenedor}>
            <h1 className='text-light'>Golazo Gourmet</h1>
            <p className='text-light'>Reservá tu cancha, jugá con amigos y disfrutá de platos únicos después del partido</p>
            <div>
                <button className={styles.btnLogin} data-bs-toggle="modal" data-bs-target="#login"><b>Iniciar
                        Sesión</b></button>
                <a href="./Pages/registro.html"><button className={styles.btnLogin}><b>Registrar</b></button></a>
            </div>
        </section>
    </div>
  )
}
