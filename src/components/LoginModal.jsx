import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { loginUser } from "../data/user";
import { useAuth } from "../context/AuthProvider";
import styles from '../styles/modal.module.css';
import { Link } from 'react-router-dom';

export default function LoginModal({ variant, className }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { setUser } = useAuth();

    const handleLogin = () => {
        const result = loginUser(username, password);

        if (result.success) {
            setError('');
            setUser(result.user);
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('rol', result.user.role);
            handleClose();

            const destino = result.user.role === 'admin' ? '/admin' : '/';
            window.location.href = destino;
        } else {
            setError(result.message);
        }
    };

    return (
        <>
            <button
                className={className}
                onClick={handleShow}
            >
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
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                            <Link to="/construccion" onClick={handleClose}> ¡Registrate!</Link>
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
