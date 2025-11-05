import logo from '../assets/img/logo.png';
import styles from '../styles/footer.module.css';

export const Footer = () => {
  return (
    <div className={`${styles.footer} bg-dark text-white`}>
      <div className={styles.piePag}>
        <div className="text-center">
          <h2>Contactanos</h2>
          <p>Comunicate con nuestro equipo</p>
          <ul className="list-unstyled">
            <li>✔ Buen Asesoramiento</li>
            <li>✔ Consultas</li>
            <li>✔ Torneos</li>
            <li>✔ Sponsor</li>
          </ul>
        </div>

        <div className="text-center">
          <h2>Información</h2>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.icono} viewBox="0 0 16 16">
              <path d="..." />
            </svg>
            381-156332211
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.icono} viewBox="0 0 16 16">
              <path d="..." />
            </svg>
            GolazoGourmet@hotmail.com
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.icono} viewBox="0 0 16 16">
              <path d="..." />
            </svg>
            Av. Perón 125, Tucumán, Argentina
          </p>
        </div>

        <div className={`text-center ${styles.redes}`}>
          <h2>Redes Sociales</h2>
          <div className={styles.iconosRedes}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-4 me-3"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://wa.me/54"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-4 me-3"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-4"
            >
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
            <img src={logo} alt="logo" className={styles.logo} />
        </div>
      </div>

      <div className="text-center">
        <small>© 2025 Golazo Gourmet. Todos los derechos reservados.</small>
      </div>
    </div>
  );
};
