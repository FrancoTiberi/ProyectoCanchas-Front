import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { loginUser } from "../data/user";
import { useAuth } from "../context/AuthProvider";
import styles from '../styles/modal.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginModal({ variant, className }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await loginUser(correo, password);

    if (result.success) {
      setError('');
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      localStorage.setItem('rol', result.user.rol);

      handleClose();

      // 🔐 Redirige solo si es admin
      if (result.user.rol === 'ADMIN_ROLE') {
        navigate('/admin');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <button className={className} onClick={handleShow}>
        Iniciar Sesión
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName={styles.modalDialog}
      >
        <Modal.Body className={styles.bodymodal}>
          <button type="button" className="btn-close" onClick={handleClose}></button>

          <Modal.Title className="mb-4">Iniciar Sesión</Modal.Title>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-4"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.bton}>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`}>
              <i className={`bi bi-google ${styles.icon}`}></i>
              Continuar con Google
            </button>

            <button type="button" className={`${styles.socialBtn} ${styles.facebook}`}>
              <i className={`bi bi-facebook ${styles.icon}`}></i>
              Continuar con Facebook
            </button>

            <p className="mt-3">
              ¿No tienes cuenta?
              <Link to="/registrar" onClick={handleClose}> ¡Registrate!</Link>
            </p>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}

          <div className={styles.footerModal}>
            <button className={styles.btnModalLogin} onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
