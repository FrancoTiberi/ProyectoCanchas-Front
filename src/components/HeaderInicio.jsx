import styles from '../styles/headerInicio.module.css';
import logo from '../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthProvider';

export default function HeaderInicio() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.contenedorPrincipal}>
            {/* NAV */}
            <section className={styles.navContenedor}>
                <nav className={styles.headerNav}>
                    <img src={logo} height="50px" alt="logo" className={styles.logo} />
                    <Link to="/" className={styles.navLinks}>Inicio</Link>
                    <Link to="/reservas" className={styles.navLinks}>Reserva-F5</Link>
                    <Link to="/menu" className={styles.navLinks}>Comida</Link>
                    <Link to="/contacto" className={styles.navLinks}>Contacto</Link>
                    <Link to="/sobrenosotros" className={styles.navLinks}>Sobre Nosotros</Link>

                    <form className={`d-flex ${styles.formBuscador}`} role="search">
                        <input className={`form-control me-2 ${styles.buscador}`} type="search" placeholder="Buscar" aria-label="Buscar" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                </nav>
            </section>

            {/* TÍTULO + SESIÓN */}
            <section className={styles.tituloContenedor}>
                <h1 className="text-light">Golazo Gourmet</h1>
                <p className="text-light">
                    Reservá tu cancha, jugá con amigos y disfrutá de platos únicos después del partido
                </p>

                {user?.name ? (
                    <div className={styles.usuarioContenedor}>
                        <div className={styles.userAvatarContainer}>
                            {user.role === 'admin' ? (
                                <Link to="/admin"><i className="bi-award-fill fs-4"></i></Link>
                            ) : (
                                <i className="bi bi-person-fill fs-4"></i>
                            )}
                        </div>
                        <span className={`${styles.userName} ${user.role === 'admin' ? styles.adminName : styles.userNameCommon}`}>
                            {user.name}
                        </span>
                        <button onClick={handleLogout} className={styles.btnSalir}>
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <div className={styles.botonesSesion}>
                        <LoginModal className={styles.btnLoginInicio} variant="inicio" />
                        <Link to="/construccion" className={`btn ${styles.btnLoginInicio}`}>
                            Registrar
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
