import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { loginUser } from "../data/user";
import { useAuth } from "../context/AuthProvider"; 
import styles from '../styles/Header.module.css';


export default function LoginModal() {
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
                    localStorage.setItem('user', JSON.stringify(user));
            handleClose();

            const destino = result.user.role === 'admin' ? '/admin' : '/';
            window.location.href = destino;
        } else {
            setError(result.message);
        }

    };

    return (
        <>
            <Button className={styles.btnLogin} onClick={handleShow}>
                Iniciar Sesión
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-danger">{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Iniciar Sesión
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
