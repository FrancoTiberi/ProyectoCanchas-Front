import { useState } from 'react';
import styles from '../styles/recupcontra.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function RecuperarContrasenia() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [contrasenia, setContrasenia] = useState('');
  const [confirmContrasenia, setConfirmContrasenia] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (contrasenia.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (contrasenia !== confirmContrasenia) {
      setError('Las contraseñas no coinciden'); 
      return;
    }

    try {
      await resetPassword(id, token, contrasenia);
      setExito('Contraseña cambiada correctamente. Redirigiendo...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.cambiarContraContenedor}>
      <div>
        <h1 className={styles.titulo}>Cambio de contraseña</h1>
        <p className={styles.subtitulo}>
          Asegurece de usar entre 8 y 15 caracteres incluyendo mayusculas, minusculas y numeros.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContra}>
            <label htmlFor="password">Nueva Contraseña</label>
            <input type="password" id="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
          </div>
          <div className={styles.inputContra}>
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input type="password" id="confirm-password" value={confirmContrasenia} onChange={(e) => setConfirmContrasenia(e.target.value)} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {exito && <p>{exito}</p>}
          <button type="submit" className={styles.submitBtn}>
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
