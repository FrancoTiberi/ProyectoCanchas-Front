import { useState } from "react";
import Modal from "react-bootstrap/Modal";
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

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(correo, password);
    console.log("Usuario autenticado:", result.user);

    if (result.success) {
      setError('');
      handleClose();

      if (result.user.rol?.toUpperCase() === 'ADMIN_ROLE') {
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

      <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
        <Modal.Body className={styles.bodymodal}>
          <button type="button" className="btn-close" onClick={handleClose}></button>
          <Modal.Title className="mb-4">Iniciar Sesión</Modal.Title>

          {user && (
            <div className="mb-3 text-center">
              <strong>Bienvenido:</strong> {user.nombre} {user.apellido}
            </div>
          )}

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
            <p className="mt-3 mb-1">¿No tienes cuenta? <Link to="/registrar" onClick={handleClose}> ¡Registrate!</Link>
            </p>
            <p className="mt-3">Olvide mi contraseña <Link to="/confirmarCorreo" onClick={handleClose}> Recuperar</Link>
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